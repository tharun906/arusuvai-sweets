package com.arusuvai.admin;

import com.arusuvai.order.PaymentStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentStatusUpdateRequestDTO {

    private PaymentStatus paymentStatus;

}