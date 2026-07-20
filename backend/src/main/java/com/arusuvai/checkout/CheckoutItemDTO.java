package com.arusuvai.checkout;

import java.math.BigDecimal;

public class CheckoutItemDTO {
    private Long productId;

    private String productName;

    private Integer quantity;

    private BigDecimal unitPrice;

    private BigDecimal totalPrice;
}
