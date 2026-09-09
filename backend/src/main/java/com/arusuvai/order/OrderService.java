package com.arusuvai.order;

import java.util.List;

public interface OrderService {

    OrderResponseDTO createOrder(OrderRequestDTO request);

    OrderResponseDTO confirmOrder(Long orderId);

    List<OrderResponseDTO> getOrdersByCustomerId(Long customerId);

    // Customer-facing method
    // Performs ownership check
    OrderResponseDTO getOrderById(
            Long orderId,
            Long customerId
    );

    // Internal backend use
    // No customer ownership check here
    OrderResponseDTO getOrderByIdInternal(Long orderId);

    List<OrderResponseDTO> getAllOrders();

    List<OrderResponseDTO> getOrdersByStatus(OrderStatus orderStatus);

    OrderResponseDTO updateOrderStatus(Long orderId, OrderStatus orderStatus);
    OrderResponseDTO updatePaymentStatus(Long orderId, PaymentStatus paymentStatus);

    OrderResponseDTO cancelOrder(
            Long orderId,
            Long customerId
    );

}
