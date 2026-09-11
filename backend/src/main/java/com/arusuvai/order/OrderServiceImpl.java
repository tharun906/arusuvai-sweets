package com.arusuvai.order;

import com.arusuvai.checkout.*;
import com.arusuvai.combopack.ComboPackRepository;
import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.enums.DeliveryType;
import com.arusuvai.enums.PaymentMethod;
import com.arusuvai.exception.BusinessException;
import com.arusuvai.exception.ResourceNotFoundException;
import com.arusuvai.notification.OrderEmailService;
import com.arusuvai.payment.PaymentService;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.product.ProductRepository;
import com.arusuvai.sweetbox.SweetBoxRepository;
import com.arusuvai.util.WeightConverter;
import org.springframework.context.annotation.Lazy;
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
    private final PaymentService paymentService;

    public OrderServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository, CustomerRepository customerRepository, OrderCalculationService orderCalculationService, DeliveryService deliveryService, SweetBoxRepository sweetBoxRepository, ComboPackRepository comboPackRepository,OrderEmailService orderEmailService, @Lazy PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.orderCalculationService = orderCalculationService;
        this.deliveryService = deliveryService;
        this.sweetBoxRepository = sweetBoxRepository;
        this.orderEmailService = orderEmailService;
        this.paymentService = paymentService;
    }

    @Transactional
    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO request) {
        CustomerEntity customer = customerRepository.findById(request.getCustomerId()).orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        Optional<OrderEntity> existingOrder = Optional.empty();
        if (request.getPaymentMethod() == PaymentMethod.ONLINE)
            existingOrder = orderRepository.findFirstByCustomerIdAndPaymentStatusOrderByCreatedAtDesc(customer.getId(), PaymentStatus.PENDING);

        OrderCalculationResult result = orderCalculationService.calculateCheckout(new CheckoutRequestDTO(request.getCustomerId(), request.getItems()));

        for (CalculatedOrderItem item : result.getItems()) {
            if (item.getItemType() != OrderItemType.PRODUCT) continue;
            ProductEntity product = productRepository.findByIdForUpdate(item.getProduct().getId()).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            BigDecimal requestedWeight = WeightConverter.toKg(item.getWeight()).multiply(BigDecimal.valueOf(item.getQuantity()));
            if (product.getCurrentStockKg().compareTo(requestedWeight) < 0)
                throw new BusinessException(product.getName() + " has only " + product.getCurrentStockKg() + " kg available. You requested " + requestedWeight + " kg.");
        }

        DeliveryCheckResponse delivery = deliveryService.checkDeliveryAvailability(customer.getLatitude(), customer.getLongitude());
        if (request.getPaymentMethod() == PaymentMethod.COD && !delivery.isCodAvailable())
            throw new BusinessException("Cash on Delivery is not available for this delivery distance");

        DeliveryType deliveryType = delivery.isLocalDelivery() ? DeliveryType.LOCAL : DeliveryType.COURIER;
        String address = customer.getDoorNo() + ", " + customer.getAddressLine1()
                + (customer.getAddressLine2() != null && !customer.getAddressLine2().isBlank() ? ", " + customer.getAddressLine2() : "")
                + (customer.getLandmark() != null && !customer.getLandmark().isBlank() ? ", Near " + customer.getLandmark() : "")
                + ", " + customer.getCity() + ", " + customer.getState() + " - " + customer.getPincode();

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
            order.setPaymentStatus(PaymentStatus.PENDING);
            order.setDeliveryAddress(address);
            order.setTotalAmount(result.getGrandTotal());
            order.setPaymentMethod(request.getPaymentMethod());
            order.setDeliveryType(deliveryType);
        }

        if (request.getPaymentMethod() == PaymentMethod.COD) {
            order.setOrderStatus(OrderStatus.PREPARING);
            for (CalculatedOrderItem item : result.getItems()) {
                if (item.getItemType() != OrderItemType.PRODUCT) continue;
                ProductEntity product = productRepository.findByIdForUpdate(item.getProduct().getId()).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
                BigDecimal orderedWeight = WeightConverter.toKg(item.getWeight());
                BigDecimal stockToReduce = orderedWeight.multiply(BigDecimal.valueOf(item.getQuantity()));
                BigDecimal updatedStock = product.getCurrentStockKg().subtract(stockToReduce);
                if (updatedStock.compareTo(BigDecimal.ZERO) < 0)
                    throw new BusinessException(product.getName() + " is out of stock.");
                product.setCurrentStockKg(updatedStock);
                productRepository.save(product);
            }
        } else {
            order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
        }

        order = orderRepository.save(order);

        for (CalculatedOrderItem item : result.getItems()) {
            OrderItemEntity orderItem = new OrderItemEntity();
            orderItem.setOrder(order);
            orderItem.setItemType(item.getItemType());
            orderItem.setProduct(item.getProduct());
            orderItem.setSweetBox(item.getSweetBox());
            orderItem.setComboPack(item.getComboPack());
            orderItem.setWeight(item.getWeight());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPricePerUnit(item.getPricePerUnit());
            orderItem.setTotalPrice(item.getItemTotal());
            orderItemRepository.save(orderItem);
            order.getOrderItems().add(orderItem);
        }

        if (request.getPaymentMethod() == PaymentMethod.COD) {
            String orderId = String.valueOf(order.getId());
            String orderDetails = orderEmailService.buildOrderDetails(order);
            String customerEmail = customer.getEmail();
            if (customerEmail != null && !customerEmail.isBlank())
                orderEmailService.sendOrderSuccessfulEmail(customerEmail, customer.getName(), orderId, orderDetails);
            orderEmailService.sendAdminNewOrderEmail(orderId, customer.getName(), order.getPaymentMethod(), order.getTotalAmount(), orderDetails);
        }
        return mapToResponse(order);
    }

    private OrderResponseDTO mapToResponse(OrderEntity order) {

        List<OrderItemResponseDTO> items =
                order.getOrderItems().stream().map(item -> {

                    if (item.getItemType() == OrderItemType.PRODUCT) {

                        return new OrderItemResponseDTO(
                                OrderItemType.PRODUCT,
                                item.getProduct().getId(),
                                item.getProduct().getName(),
                                null,
                                null,
                                null,
                                null,
                                item.getWeight(),
                                item.getQuantity(),
                                item.getPricePerUnit(),
                                item.getTotalPrice()
                        );
                    }

                    if (item.getItemType() == OrderItemType.SWEET_BOX) {

                        return new OrderItemResponseDTO(
                                OrderItemType.SWEET_BOX,
                                null,
                                null,
                                item.getSweetBox().getId(),
                                item.getSweetBox().getName(),
                                null,
                                null,
                                item.getWeight(),
                                item.getQuantity(),
                                item.getPricePerUnit(),
                                item.getTotalPrice()
                        );
                    }

                    return new OrderItemResponseDTO(
                            OrderItemType.COMBO_PACK,
                            null,
                            null,
                            null,
                            null,
                            item.getComboPack().getId(),
                            item.getComboPack().getTitle(),
                            item.getWeight(),
                            item.getQuantity(),
                            item.getPricePerUnit(),
                            item.getTotalPrice()
                    );

                }).toList();

        return new OrderResponseDTO(
                order.getId(),
                order.getCustomer().getId(),
                order.getCustomer().getName(),
                order.getTotalAmount(),
                order.getOrderStatus(),
                order.getPaymentStatus(),
                order.getPaymentMethod(),
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
        if (order.getOrderStatus() == OrderStatus.CANCELLED) throw new BusinessException("Cancelled order cannot be confirmed");
        if (order.getPaymentMethod() != PaymentMethod.ONLINE) throw new BusinessException("Only online payments can be confirmed");

        order.setPaymentStatus(PaymentStatus.PAID);
        order.setOrderStatus(OrderStatus.PREPARING);

        for (OrderItemEntity orderItem : order.getOrderItems()) {
            if (orderItem.getItemType() != OrderItemType.PRODUCT) continue;
            ProductEntity product = productRepository.findByIdForUpdate(orderItem.getProduct().getId()).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            BigDecimal orderedWeight = WeightConverter.toKg(orderItem.getWeight());
            BigDecimal stockToReduce = orderedWeight.multiply(BigDecimal.valueOf(orderItem.getQuantity()));
            BigDecimal updatedStock = product.getCurrentStockKg().subtract(stockToReduce);
            if (updatedStock.compareTo(BigDecimal.ZERO) < 0)
                throw new BusinessException(product.getName() + " is out of stock.");
            product.setCurrentStockKg(updatedStock);
            productRepository.save(product);
        }

        orderRepository.save(order);
        String orderNumber = String.valueOf(order.getId());
        String orderDetails = orderEmailService.buildOrderDetails(order);
        String customerEmail = order.getCustomer().getEmail();
        if (customerEmail != null && !customerEmail.isBlank())
            orderEmailService.sendOrderSuccessfulEmail(customerEmail, order.getCustomer().getName(), orderNumber, orderDetails);
        orderEmailService.sendAdminNewOrderEmail(orderNumber, order.getCustomer().getName(), order.getPaymentMethod(), order.getTotalAmount(), orderDetails);
        return mapToResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getOrdersByCustomerId(Long customerId) {
        customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        return orderRepository.findCustomerOrdersForMyOrders(customerId).stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponseDTO getOrderById(Long orderId, Long customerId) {
        OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        if (!order.getCustomer().getId().equals(customerId))
            throw new BusinessException("You are not allowed to access this order");
        return mapToResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponseDTO getOrderByIdInternal(Long orderId) {
        return mapToResponse(orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found")));
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getOrdersByStatus(OrderStatus orderStatus) {
        return orderRepository.findByOrderStatusOrderByCreatedAtDesc(orderStatus).stream().map(this::mapToResponse).toList();
    }

    @Override
    @Transactional
    public OrderResponseDTO updateOrderStatus(Long orderId, OrderStatus orderStatus) {
        OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        DeliveryType deliveryType = order.getDeliveryType();
        if (deliveryType == DeliveryType.LOCAL && orderStatus == OrderStatus.COURIER_DISPATCHED)
            throw new BusinessException("Local orders cannot be marked as courier dispatched");

        order.setOrderStatus(orderStatus);
        orderRepository.save(order);

        String customerEmail = order.getCustomer().getEmail();
        if (customerEmail != null && !customerEmail.isBlank()) {
            if (orderStatus == OrderStatus.COURIER_DISPATCHED && deliveryType == DeliveryType.COURIER)
                orderEmailService.sendCourierDispatchedEmail(customerEmail, order.getCustomer().getName(), String.valueOf(order.getId()));
            if (orderStatus == OrderStatus.DELIVERED)
                orderEmailService.sendOrderDeliveredEmail(customerEmail, order.getCustomer().getName(), String.valueOf(order.getId()));
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

    @Override
    @Transactional
    public OrderResponseDTO cancelOrder(Long orderId, Long customerId) {
        OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        if (!order.getCustomer().getId().equals(customerId))
            throw new BusinessException("You are not allowed to cancel this order");
        if (order.getOrderStatus() == OrderStatus.CANCELLED)
            throw new BusinessException("Order is already cancelled");
        if (order.getOrderStatus() == OrderStatus.DELIVERED)
            throw new BusinessException("Delivered orders cannot be cancelled");

        boolean cancellationAllowed =
                (order.getDeliveryType() == DeliveryType.LOCAL && order.getPaymentMethod() == PaymentMethod.COD && order.getOrderStatus() == OrderStatus.PREPARING)
                        || (order.getDeliveryType() == DeliveryType.LOCAL && order.getPaymentMethod() == PaymentMethod.ONLINE && order.getPaymentStatus() == PaymentStatus.PAID && order.getOrderStatus() == OrderStatus.PREPARING)
                        || (order.getDeliveryType() == DeliveryType.COURIER && order.getPaymentMethod() == PaymentMethod.ONLINE && order.getPaymentStatus() == PaymentStatus.PAID && order.getOrderStatus() == OrderStatus.PREPARING);

        if (!cancellationAllowed)
            throw new BusinessException("This order can no longer be cancelled");

        if (order.getPaymentMethod() == PaymentMethod.COD) {
            order.setOrderStatus(OrderStatus.CANCELLED);
            restoreProductStock(order);
            orderRepository.save(order);
            orderEmailService.sendAdminOrderCancelledEmail(String.valueOf(order.getId()), order.getCustomer().getName(), order.getPaymentMethod(), order.getTotalAmount(), BigDecimal.ZERO);
            return mapToResponse(order);
        }

        if (order.getPaymentMethod() == PaymentMethod.ONLINE && order.getPaymentStatus() == PaymentStatus.PAID) {
            BigDecimal refundAmount = order.getTotalAmount()
                    .multiply(DeliveryConstants.CANCELLATION_REFUND_PERCENTAGE)
                    .divide(BigDecimal.valueOf(100), 2, java.math.RoundingMode.HALF_UP);
            paymentService.refundPayment(order.getId(), refundAmount);
            order.setPaymentStatus(PaymentStatus.REFUNDED);
            order.setOrderStatus(OrderStatus.CANCELLED);
            restoreProductStock(order);
            orderRepository.save(order);

            String orderNumber = String.valueOf(order.getId());
            String customerName = order.getCustomer().getName();
            String customerEmail = order.getCustomer().getEmail();
            if (customerEmail != null && !customerEmail.isBlank())
                orderEmailService.sendRefundInitiatedEmail(customerEmail, customerName, orderNumber, order.getTotalAmount(), refundAmount);

            orderEmailService.sendAdminOrderCancelledEmail(orderNumber, customerName, order.getPaymentMethod(), order.getTotalAmount(), refundAmount);
            return mapToResponse(order);
        }

        throw new BusinessException("This order cannot be cancelled");
    }

    private void restoreProductStock(OrderEntity order) {
        for (OrderItemEntity orderItem : order.getOrderItems()) {
            if (orderItem.getItemType() != OrderItemType.PRODUCT) continue;
            ProductEntity product = productRepository.findByIdForUpdate(orderItem.getProduct().getId()).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
            BigDecimal orderedWeight = WeightConverter.toKg(orderItem.getWeight());
            BigDecimal stockToRestore = orderedWeight.multiply(BigDecimal.valueOf(orderItem.getQuantity()));
            product.setCurrentStockKg(product.getCurrentStockKg().add(stockToRestore));
            productRepository.save(product);
        }
    }
}