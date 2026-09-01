package com.arusuvai.order;

import com.arusuvai.enums.DeliveryType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

//CUSTOMER DETAILS + ORDER ITEM DETALS
@Getter
@Setter
@AllArgsConstructor
public class OrderResponseDTO {

    private Long orderId;

    private Long customerId;

    private String customerName;

    private BigDecimal totalAmount;

    private OrderStatus orderStatus;

    private PaymentStatus paymentStatus;

    private DeliveryType deliveryType;

    private String deliveryAddress;

    private Double latitude;

    private Double longitude;

    private LocalDateTime createdAt;

    private List<OrderItemResponseDTO> items;
}