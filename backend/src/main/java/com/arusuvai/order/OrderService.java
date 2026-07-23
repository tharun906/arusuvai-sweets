package com.arusuvai.order;

import java.util.List;

public interface OrderService {
    OrderResponseDTO createOrder(OrderRequestDTO request);
    OrderResponseDTO confirmOrder(Long orderId);
    List<OrderResponseDTO> getOrdersByCustomerId(Long customerId);
    OrderResponseDTO getOrderById(Long orderId);
    List<OrderResponseDTO> getAllOrders();
    List<OrderResponseDTO> getOrdersByStatus(OrderStatus orderStatus);
    OrderResponseDTO updateOrderStatus(Long orderId, OrderStatus orderStatus);
}
