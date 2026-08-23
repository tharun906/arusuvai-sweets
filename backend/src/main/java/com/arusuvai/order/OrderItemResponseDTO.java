package com.arusuvai.order;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class OrderItemResponseDTO {

    private OrderItemType itemType;

    private Long productId;
    private String productName;

    private Long sweetBoxId;
    private String sweetBoxName;

    private String weight;

    private Integer quantity;

    private BigDecimal pricePerUnit;

    private BigDecimal totalPrice;
}