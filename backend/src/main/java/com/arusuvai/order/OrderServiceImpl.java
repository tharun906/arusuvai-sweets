package com.arusuvai.order;

import com.arusuvai.checkout.*;
import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.enums.DeliveryType;
import com.arusuvai.enums.PaymentMethod;
import com.arusuvai.exception.BusinessException;
import com.arusuvai.exception.ResourceNotFoundException;
import com.arusuvai.notification.OrderEmailService;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.product.ProductRepository;
import com.arusuvai.sweetbox.SweetBoxRepository;
import com.arusuvai.util.WeightConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final OrderCalculationService orderCalculationService;
    private final ProductRepository productRepository;
    private final DeliveryService deliveryService;
    private final SweetBoxRepository sweetBoxRepository;
    private final OrderEmailService orderEmailService;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            ProductRepository productRepository,
            CustomerRepository customerRepository,
            OrderCalculationService orderCalculationService,
            DeliveryService deliveryService,
            SweetBoxRepository sweetBoxRepository,
            OrderEmailService orderEmailService
    ) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.orderCalculationService = orderCalculationService;
        this.deliveryService = deliveryService;
        this.sweetBoxRepository = sweetBoxRepository;
        this.orderEmailService = orderEmailService;
    }


    @Transactional
    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO request) {
        CustomerEntity customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Optional<OrderEntity> existingOrder = Optional.empty();
        if (request.getPaymentMethod() == PaymentMethod.ONLINE)
            existingOrder = orderRepository.findFirstByCustomerIdAndPaymentStatusOrderByCreatedAtDesc(
                    customer.getId(), PaymentStatus.PENDING);

        OrderCalculationResult result = orderCalculationService.calculateCheckout(
                new CheckoutRequestDTO(request.getCustomerId(), request.getItems()));

        for (CalculatedOrderItem item : result.getItems()) {
            if (item.getItemType() != OrderItemType.PRODUCT) continue;

            ProductEntity product = productRepository.findByIdForUpdate(item.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            BigDecimal requestedWeight = WeightConverter.toKg(item.getWeight())
                    .multiply(BigDecimal.valueOf(item.getQuantity()));

            if (product.getCurrentStockKg().compareTo(requestedWeight) < 0)
                throw new BusinessException(product.getName() + " has only " +
                        product.getCurrentStockKg() + " kg available. You requested " +
                        requestedWeight + " kg.");
        }

        DeliveryCheckResponse delivery = deliveryService.checkDeliveryAvailability(
                customer.getLatitude(), customer.getLongitude());

        if (request.getPaymentMethod() == PaymentMethod.COD
                && !delivery.isCodAvailable()) {

            throw new BusinessException(
                    "Cash on Delivery is not available for this delivery distance"
            );
        }

        DeliveryType deliveryType =
                delivery.isLocalDelivery()
                        ? DeliveryType.LOCAL
                        : DeliveryType.COURIER;
        String address = customer.getDoorNo() + ", " + customer.getAddressLine1() +
                (customer.getAddressLine2() != null && !customer.getAddressLine2().isBlank()
                        ? ", " + customer.getAddressLine2() : "") +
                (customer.getLandmark() != null && !customer.getLandmark().isBlank()
                        ? ", Near " + customer.getLandmark() : "") +
                ", " + customer.getCity() + ", " + customer.getState() +
                " - " + customer.getPincode();

        OrderEntity order;
        if (existingOrder.isPresent()) {
            order = existingOrder.get();
            order.setRazorpayOrderId(null);
            order.setRazorpayPaymentId(null);
            orderItemRepository.deleteAll(order.getOrderItems());
            order.getOrderItems().clear();
            order.setTotalAmount(result.getGrandTotal());
            order.setDeliveryAddress(address);
            order.setPaymentMethod(request.getPaymentMethod());
            order.setDeliveryType(deliveryType);
        } else {
            order = new OrderEntity();
            order.setCustomer(customer);
            order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
            order.setPaymentStatus(PaymentStatus.PENDING);
            order.setDeliveryAddress(address);
            order.setTotalAmount(result.getGrandTotal());
            order.setPaymentMethod(request.getPaymentMethod());
            order.setDeliveryType(deliveryType);
        }

        order = orderRepository.save(order);

        for (CalculatedOrderItem item : result.getItems()) {
            OrderItemEntity orderItem = new OrderItemEntity();
            orderItem.setOrder(order);
            orderItem.setItemType(item.getItemType());
            orderItem.setProduct(item.getProduct());
            orderItem.setSweetBox(item.getSweetBox());
            orderItem.setWeight(item.getWeight());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPricePerUnit(item.getPricePerUnit());
            orderItem.setTotalPrice(item.getItemTotal());
            orderItemRepository.save(orderItem);
            order.getOrderItems().add(orderItem);
        }

        return mapToResponse(order);
    }

    private OrderResponseDTO mapToResponse(OrderEntity order) {
        List<OrderItemResponseDTO> items = order.getOrderItems().stream().map(item -> {
            if (item.getItemType() == OrderItemType.PRODUCT) {
                return new OrderItemResponseDTO(OrderItemType.PRODUCT, item.getProduct().getId(), item.getProduct().getName(), null, null, item.getWeight(), item.getQuantity(), item.getPricePerUnit(), item.getTotalPrice());
            }
            return new OrderItemResponseDTO(OrderItemType.SWEET_BOX, null, null, item.getSweetBox().getId(), item.getSweetBox().getName(), item.getWeight(), item.getQuantity(), item.getPricePerUnit(), item.getTotalPrice());
        }).toList();

        return new OrderResponseDTO(
                order.getId(),
                order.getCustomer().getId(),
                order.getCustomer().getName(),
                order.getTotalAmount(),
                order.getOrderStatus(),
                order.getPaymentStatus(),
                order.getDeliveryType(),
                order.getDeliveryAddress(),
                order.getCustomer().getLatitude(),
                order.getCustomer().getLongitude(),
                order.getCreatedAt(),
                items
        );
    }

    @Override
    @Transactional
    public OrderResponseDTO confirmOrder(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (order.getPaymentStatus() == PaymentStatus.PAID) return mapToResponse(order);

        if (order.getOrderStatus() == OrderStatus.CANCELLED) {
            throw new BusinessException("Cancelled order cannot be confirmed");
        }

        order.setPaymentStatus(PaymentStatus.PAID);
        order.setOrderStatus(OrderStatus.PREPARING);

        for (OrderItemEntity orderItem : order.getOrderItems()) {
            if (orderItem.getItemType() == OrderItemType.SWEET_BOX) continue;

            ProductEntity product = productRepository.findByIdForUpdate(orderItem.getProduct().getId()).orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            BigDecimal orderedWeight = WeightConverter.toKg(orderItem.getWeight());
            BigDecimal stockToReduce = orderedWeight.multiply(BigDecimal.valueOf(orderItem.getQuantity()));
            BigDecimal updatedStock = product.getCurrentStockKg().subtract(stockToReduce);

            if (updatedStock.compareTo(BigDecimal.ZERO) < 0) {
                throw new BusinessException(product.getName() + " is out of stock.");
            }

            product.setCurrentStockKg(updatedStock);
            productRepository.save(product);
        }

        orderRepository.save(order);

        String customerEmail = order.getCustomer().getEmail();

        if (customerEmail != null && !customerEmail.isBlank()) {
            orderEmailService.sendOrderSuccessfulEmail(
                    customerEmail,
                    order.getCustomer().getName(),
                    String.valueOf(order.getId()),
                    orderEmailService.buildOrderDetails(order)
            );
        }
        return mapToResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getOrdersByCustomerId(Long customerId) {
        customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        List<OrderEntity> orders = orderRepository.findCustomerOrdersForMyOrders(customerId);
        return orders.stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponseDTO getOrderById(Long orderId, Long customerId) {
        OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getCustomer().getId().equals(customerId)) {
            throw new BusinessException("You are not allowed to access this order");
        }

        return mapToResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponseDTO getOrderByIdInternal(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return mapToResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAllOrders() {
        List<OrderEntity> orders = orderRepository.findAllByOrderByCreatedAtDesc();
        return orders.stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getOrdersByStatus(OrderStatus orderStatus) {
        List<OrderEntity> orders = orderRepository.findByOrderStatusOrderByCreatedAtDesc(orderStatus);
        return orders.stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional
    public OrderResponseDTO updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        DeliveryType deliveryType = order.getDeliveryType();

        if (deliveryType == DeliveryType.LOCAL
                && orderStatus == OrderStatus.COURIER_DISPATCHED) {
            throw new BusinessException("Local orders cannot be marked as courier dispatched");
        }

        // REMOVE THIS BLOCK — courier orders MUST be allowed to become DELIVERED
    /*
    if (deliveryType == DeliveryType.COURIER
            && orderStatus == OrderStatus.DELIVERED) {
        throw new BusinessException("Courier orders cannot be marked as delivered");
    }
    */

        order.setOrderStatus(orderStatus);
        orderRepository.save(order);

        // Courier Dispatched email
        if (orderStatus == OrderStatus.COURIER_DISPATCHED
                && deliveryType == DeliveryType.COURIER) {

            String customerEmail = order.getCustomer().getEmail();

            if (customerEmail != null && !customerEmail.isBlank()) {
                orderEmailService.sendCourierDispatchedEmail(
                        customerEmail,
                        order.getCustomer().getName(),
                        String.valueOf(order.getId())
                );
            }
        }

        // Delivered email
        if (orderStatus == OrderStatus.DELIVERED) {

            String customerEmail = order.getCustomer().getEmail();

            if (customerEmail != null && !customerEmail.isBlank()) {
                orderEmailService.sendOrderDeliveredEmail(
                        customerEmail,
                        order.getCustomer().getName(),
                        String.valueOf(order.getId())
                );
            }
        }

        return mapToResponse(order);
    }

    @Override
    @Transactional
    public OrderResponseDTO updatePaymentStatus(Long orderId, PaymentStatus paymentStatus) {
        OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setPaymentStatus(paymentStatus);
        orderRepository.save(order);
        return mapToResponse(order);
    }
}