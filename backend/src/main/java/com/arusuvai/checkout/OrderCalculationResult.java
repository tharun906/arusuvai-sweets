package com.arusuvai.checkout;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class OrderCalculationResult {

    private List<CalculatedOrderItem> items;

    private BigDecimal subtotal;

    private BigDecimal deliveryCharge;

    private BigDecimal grandTotal;
}