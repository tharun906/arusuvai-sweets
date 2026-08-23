package com.arusuvai.checkout;

import com.arusuvai.order.OrderItemType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CheckoutItemDTO {

    private OrderItemType itemType;

    private Long productId;

    private String productName;

    private Long sweetBoxId;

    private String sweetBoxName;

    private String weight;

    private Integer quantity;

    private BigDecimal unitPrice;

    private BigDecimal totalPrice;
}