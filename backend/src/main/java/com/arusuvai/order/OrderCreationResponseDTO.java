package com.arusuvai.order;

import com.arusuvai.enums.PaymentMethod;
import com.arusuvai.payment.PaymentResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreationResponseDTO {

    private Long orderId;

    private PaymentMethod paymentMethod;

    private boolean paymentRequired;

    private PaymentResponseDTO payment;

}