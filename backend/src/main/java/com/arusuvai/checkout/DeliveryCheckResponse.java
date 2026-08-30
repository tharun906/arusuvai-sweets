package com.arusuvai.checkout;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DeliveryCheckResponse {

    private double distance;

    private boolean withinDeliveryArea;

    private boolean codAvailable;

    private BigDecimal deliveryCharge;

    private boolean localDelivery;

    private String message;

}