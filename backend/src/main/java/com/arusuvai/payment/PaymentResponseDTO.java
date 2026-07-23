package com.arusuvai.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentResponseDTO {

    public PaymentResponseDTO(
            Long orderId,
            String razorpayOrderId,
            String keyId,
            Integer amount,
            String currency) {

        this.orderId = orderId;
        this.razorpayOrderId = razorpayOrderId;
        this.keyId = keyId;
        this.amount = amount;
        this.currency = currency;
    }

    private Long orderId;

    private String razorpayOrderId;

    private String keyId;

    private Integer amount;

    private String currency;
}
