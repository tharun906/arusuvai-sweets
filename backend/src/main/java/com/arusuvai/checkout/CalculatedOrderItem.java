package com.arusuvai.checkout;

import com.arusuvai.product.ProductEntity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CalculatedOrderItem {

    private ProductEntity product;

    private String weight;

    private Integer quantity;

    private BigDecimal pricePerUnit;

    private BigDecimal itemTotal;
}