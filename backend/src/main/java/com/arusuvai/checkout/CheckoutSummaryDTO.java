package com.arusuvai.checkout;

import java.math.BigDecimal;
import java.util.List;

public class CheckoutSummaryDTO {
    private List<CheckoutItemDTO> items;

    private BigDecimal subtotal;

    private BigDecimal deliveryCharge;

    private BigDecimal grandTotal;
}
