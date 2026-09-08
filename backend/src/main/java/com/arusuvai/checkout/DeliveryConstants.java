package com.arusuvai.checkout;

import java.math.BigDecimal;

public final class DeliveryConstants {

    private DeliveryConstants() {
    }

    // Arusuvai Sweets Shop Location
    public static final double SHOP_LATITUDE = 11.1237658;

    public static final double SHOP_LONGITUDE = 77.3347706;

    // Free delivery up to 5 km
    public static final double FREE_DELIVERY_DISTANCE_KM = 5.0;

    // COD available up to 10 km
    public static final double COD_MAX_DISTANCE_KM = 10.0;

    // Delivery charges
    public static final BigDecimal FREE_DELIVERY_CHARGE =
            BigDecimal.ZERO;

    public static final BigDecimal LOCAL_DELIVERY_CHARGE =
            BigDecimal.valueOf(40);

    // Courier calculation
    // Courier office charges ₹50 per 1 kg
    public static final BigDecimal COURIER_RATE_PER_KG =
            BigDecimal.valueOf(50);

    // Customer pays 80% of the calculated courier cost
    public static final BigDecimal COURIER_CUSTOMER_PERCENTAGE =
            BigDecimal.valueOf(80);
}