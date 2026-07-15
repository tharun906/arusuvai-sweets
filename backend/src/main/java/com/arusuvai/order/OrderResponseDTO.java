package com.arusuvai.order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
public class OrderResponseDTO {

    private Long orderId;

    private Long customerId;

    private String customerName;

    private BigDecimal totalAmount;

    private OrderStatus orderStatus;

    private PaymentStatus paymentStatus;

    private String deliveryAddress;

    private List<OrderItemResponseDTO> items;
}