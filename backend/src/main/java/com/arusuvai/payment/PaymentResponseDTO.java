package com.arusuvai.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentResponseDTO {

    private Long orderId;

    private String razorpayOrderId;

    private String keyId;

    private Integer amount;

    private String currency;
}
