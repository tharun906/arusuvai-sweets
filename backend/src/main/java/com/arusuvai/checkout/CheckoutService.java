package com.arusuvai.checkout;

public interface CheckoutService {
    CheckoutSummaryDTO getCheckoutSummary(CheckoutRequestDTO request);
}
