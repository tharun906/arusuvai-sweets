package com.arusuvai.payment;

import java.math.BigDecimal;

public interface PaymentService {
    PaymentResponseDTO createPaymentOrder(Long orderId, BigDecimal totalAmount);
    void verifyPayment(PaymentVerifyRequestDTO request);
}
