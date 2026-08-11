package com.arusuvai.payment;

import com.arusuvai.order.OrderResponseDTO;

import java.math.BigDecimal;

public interface PaymentService {
    PaymentResponseDTO createPaymentOrder(Long orderId, BigDecimal totalAmount);
    OrderResponseDTO verifyPayment(PaymentVerifyRequestDTO request);
    OrderResponseDTO markPaymentFailed(Long orderId);
    void handleWebhook(String payload, String signature);
}