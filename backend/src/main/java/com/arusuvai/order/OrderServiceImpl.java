package com.arusuvai.order;

import com.arusuvai.checkout.*;
import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.enums.DeliveryType;
import com.arusuvai.exception.BusinessException;
import com.arusuvai.exception.ResourceNotFoundException;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.product.ProductRepository;
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

    public OrderServiceImpl(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            CustomerRepository customerRepository,
            OrderCalculationService orderCalculationService,
            ProductRepository productRepository,
            DeliveryService deliveryService) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.orderCalculationService = orderCalculationService;
        this.productRepository=productRepository;
        this.deliveryService=deliveryService;
    }

    @Transactional
    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO request) {

        CustomerEntity customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Optional<OrderEntity> existingOrder = orderRepository
                .findFirstByCustomerIdAndPaymentStatusOrderByCreatedAtDesc(
                        customer.getId(),
                        PaymentStatus.PENDING
                );

        // Calculate the order (stock validation, pricing, totals)
        OrderCalculationResult calculationResult =
                orderCalculationService.calculateCheckout(
                        new CheckoutRequestDTO(
                                request.getCustomerId(),
                                request.getItems()
                        )
                );

        // Check delivery availability
        DeliveryCheckResponse deliveryResponse =
                deliveryService.checkDeliveryAvailability(
                        customer.getLatitude(),
                        customer.getLongitude()
                );

        DeliveryType deliveryType =
                deliveryResponse.isWithinDeliveryArea()
                        ? DeliveryType.LOCAL
                        : DeliveryType.COURIER;

        OrderEntity order;

        if (existingOrder.isPresent()) {

            order = existingOrder.get();

            // Remove old order items
            orderItemRepository.deleteAll(order.getOrderItems());
            order.getOrderItems().clear();

            // Update latest order details
            order.setTotalAmount(calculationResult.getGrandTotal());
            order.setDeliveryAddress(
                    customer.getDoorNo()
                            + ", "
                            + customer.getAddressLine1()
                            + (customer.getAddressLine2() != null &&
                            !customer.getAddressLine2().isBlank()
                            ? ", " + customer.getAddressLine2()
                            : "")
                            + (customer.getLandmark() != null &&
                            !customer.getLandmark().isBlank()
                            ? ", Near " + customer.getLandmark()
                            : "")
                            + ", "
                            + customer.getCity()
                            + ", "
                            + customer.getState()
                            + " - "
                            + customer.getPincode()
            );
            order.setPaymentMethod(request.getPaymentMethod());
            order.setDeliveryType(deliveryType);

        } else {

            order = new OrderEntity();

            order.setCustomer(customer);
            order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
            order.setPaymentStatus(PaymentStatus.PENDING);
            order.setDeliveryAddress(
                    customer.getDoorNo()
                            + ", "
                            + customer.getAddressLine1()
                            + (customer.getAddressLine2() != null &&
                            !customer.getAddressLine2().isBlank()
                            ? ", " + customer.getAddressLine2()
                            : "")
                            + (customer.getLandmark() != null &&
                            !customer.getLandmark().isBlank()
                            ? ", Near " + customer.getLandmark()
                            : "")
                            + ", "
                            + customer.getCity()
                            + ", "
                            + customer.getState()
                            + " - "
                            + customer.getPincode()
            );
            order.setTotalAmount(calculationResult.getGrandTotal());
            order.setPaymentMethod(request.getPaymentMethod());
            order.setDeliveryType(deliveryType);

            order = orderRepository.save(order);
        }

        order = orderRepository.save(order);

        // Save Order Items
        for (CalculatedOrderItem calculatedItem : calculationResult.getItems()) {

            OrderItemEntity orderItem = new OrderItemEntity();

            orderItem.setOrder(order);
            orderItem.setProduct(calculatedItem.getProduct());
            orderItem.setWeight(calculatedItem.getWeight());
            orderItem.setQuantity(calculatedItem.getQuantity());
            orderItem.setPricePerUnit(calculatedItem.getPricePerUnit());
            orderItem.setTotalPrice(calculatedItem.getItemTotal());

            orderItemRepository.save(orderItem);

            order.getOrderItems().add(orderItem);

        }

        return mapToResponse(order);
    }

    private OrderResponseDTO mapToResponse(OrderEntity order) {

        List<OrderItemResponseDTO> items = order.getOrderItems()
                .stream()
                .map(item -> new OrderItemResponseDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getWeight(),
                        item.getQuantity(),
                        item.getPricePerUnit(),
                        item.getTotalPrice()
                ))
                .toList();

        return new OrderResponseDTO(
                order.getId(),
                order.getCustomer().getId(),
                order.getCustomer().getName(),
                order.getTotalAmount(),
                order.getOrderStatus(),
                order.getPaymentStatus(),
                order.getDeliveryType(),
                order.getDeliveryAddress(),
                order.getCreatedAt(),
                items
        );
    }

    @Override
    @Transactional
    public OrderResponseDTO confirmOrder(Long orderId){
        OrderEntity order  = orderRepository.findById(orderId)
                .orElseThrow(() ->new ResourceNotFoundException("order Not Found"));

        if (order.getPaymentStatus() == PaymentStatus.PAID) {return mapToResponse(order);}

        order.setPaymentStatus(PaymentStatus.PAID);
        order.setOrderStatus(OrderStatus.PREPARING);

        for(OrderItemEntity orderItem : order.getOrderItems()){
            ProductEntity product =orderItem.getProduct();
            BigDecimal orderedWeight = WeightConverter.toKg(orderItem.getWeight());
            BigDecimal stockTOReduce = orderedWeight.multiply(BigDecimal.valueOf(orderItem.getQuantity()));
            BigDecimal updatedStock  = product.getCurrentStockKg().subtract(stockTOReduce);
            if (updatedStock.compareTo(BigDecimal.ZERO) < 0) {
                throw new BusinessException(
                        product.getName() + " is out of stock."
                );
            }
            product.setCurrentStockKg(updatedStock);
            productRepository.save(product);
        }
        orderRepository.save(order);
        return mapToResponse(order);
    }

    //LATER

//    Enterprise approach
//    Usually there are two different DTOs:
//
//    Order History
//
//    Order ID
//    Amount
//     Status
//    Created At
//
//    Order Details
//
//    Order ID
//    Customer
//    Items
//    Address
//    Payment
//    Total
//

    //READ OMLY - only reads data and will not make changes.
    // This optimizes performance by disabling Hibernate change-tracking and
    // allows the database to run faster read-only queries.

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getOrdersByCustomerId(Long customerId) {

        customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        List<OrderEntity> orders =
                orderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);

        return orders.stream()
                .map(this::mapToResponse)
                .toList();
    }

    //to get the individual order detials
    @Override
    @Transactional
    public OrderResponseDTO getOrderById(Long orderId) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        return mapToResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAllOrders() {

        List<OrderEntity> orders = orderRepository.findAllByOrderByCreatedAtDesc();

        return orders.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getOrdersByStatus(OrderStatus orderStatus) {

        List<OrderEntity> orders = orderRepository.findByOrderStatusOrderByCreatedAtDesc(orderStatus);

        return orders.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional
    public OrderResponseDTO updateOrderStatus(Long orderId, OrderStatus orderStatus) {

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        DeliveryType deliveryType = order.getDeliveryType();

        // LOCAL delivery cannot be marked as courier dispatched
        if (deliveryType == DeliveryType.LOCAL
                && orderStatus == OrderStatus.COURIER_DISPATCHED) {

            throw new BusinessException("Local orders cannot be marked as courier dispatched");
        }

        // COURIER delivery cannot be marked as locally delivered
        if (deliveryType == DeliveryType.COURIER
                && orderStatus == OrderStatus.DELIVERED) {

            throw new BusinessException("Courier orders cannot be marked as delivered");
        }

        order.setOrderStatus(orderStatus);
        orderRepository.save(order);

        return mapToResponse(order);
    }

    @Override
    @Transactional
    public OrderResponseDTO updatePaymentStatus(Long orderId, PaymentStatus paymentStatus) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        order.setPaymentStatus(paymentStatus);
        orderRepository.save(order);

        return mapToResponse(order);
    }
}