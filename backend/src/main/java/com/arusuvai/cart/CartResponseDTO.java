package com.arusuvai.cart;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class CartResponseDTO {
    private Long id;

    private Long customerId;

    private String customerName;

    private Long productId;

    private String productName;

    private String weight;

    private Integer quantity;

    private BigDecimal pricePerUnit;

    private BigDecimal totalPrice;
}
