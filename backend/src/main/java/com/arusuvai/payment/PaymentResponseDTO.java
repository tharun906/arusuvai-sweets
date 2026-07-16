package com.arusuvai.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentResponseDTO {

    private String razorpayOrderId;

    private String key;

    private Integer amount;

    private String currency;
}