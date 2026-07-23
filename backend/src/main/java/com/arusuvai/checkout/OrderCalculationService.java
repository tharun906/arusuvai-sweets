package com.arusuvai.checkout;

public interface OrderCalculationService {
    OrderCalculationResult calculateCheckout(CheckoutRequestDTO request);
}
