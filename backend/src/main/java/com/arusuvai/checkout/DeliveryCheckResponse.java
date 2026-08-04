package com.arusuvai.checkout;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeliveryCheckResponse {

    // Distance between shop and customer
    private double distance;

    // Is customer within our delivery area?
    private boolean withinDeliveryArea;

    // Can customer choose Cash on Delivery?
    private boolean codAvailable;

    // Message to display in UI
    private String message;

}