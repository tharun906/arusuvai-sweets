package com.arusuvai.checkout;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class DeliveryService {

    // Radius of the Earth in kilometers.
    private static final double EARTH_RADIUS_KM = 6371.0;

    public double calculateDistance(
            double customerLatitude,
            double customerLongitude
    ) {

        double latitudeDifference =
                Math.toRadians(
                        customerLatitude -
                                DeliveryConstants.SHOP_LATITUDE
                );

        double longitudeDifference =
                Math.toRadians(
                        customerLongitude -
                                DeliveryConstants.SHOP_LONGITUDE
                );

        double shopLatitude =
                Math.toRadians(
                        DeliveryConstants.SHOP_LATITUDE
                );

        double customerLatitudeRadians =
                Math.toRadians(
                        customerLatitude
                );

        double haversineValue =
                Math.sin(latitudeDifference / 2)
                        * Math.sin(latitudeDifference / 2)

                        +

                        Math.cos(shopLatitude)
                                * Math.cos(customerLatitudeRadians)

                                * Math.sin(longitudeDifference / 2)
                                * Math.sin(longitudeDifference / 2);

        double centralAngle =
                2 * Math.atan2(
                        Math.sqrt(haversineValue),
                        Math.sqrt(1 - haversineValue)
                );

        return EARTH_RADIUS_KM * centralAngle;
    }

    public DeliveryCheckResponse getDeliveryDetails(
            double distance
    ) {

        BigDecimal deliveryCharge;
        boolean codAvailable;
        boolean localDelivery;
        String message;

        /*
         * ========================================
         * WITHIN 5 KM
         * ========================================
         *
         * Free delivery + COD
         */
        if (distance <= DeliveryConstants.FREE_DELIVERY_DISTANCE_KM) {

            deliveryCharge =
                    DeliveryConstants.FREE_DELIVERY_CHARGE;

            codAvailable = true;
            localDelivery = true;

            message =
                    "Free delivery. Cash on Delivery and Online Payment are available.";

        }

        /*
         * ========================================
         * ABOVE 5 KM UP TO 10 KM
         * ========================================
         *
         * ₹40 delivery + COD
         */
        else if (distance <= DeliveryConstants.COD_MAX_DISTANCE_KM) {

            deliveryCharge =
                    DeliveryConstants.LOCAL_DELIVERY_CHARGE;

            codAvailable = true;
            localDelivery = true;

            message =
                    "₹40 delivery charge. Cash on Delivery and Online Payment are available.";

        }

        /*
         * ========================================
         * ABOVE 10 KM
         * ========================================
         *
         * ₹70 courier delivery + Online Payment only
         */
        else {

            deliveryCharge =
                    DeliveryConstants.OUTSIDE_LOCAL_DELIVERY_CHARGE;

            codAvailable = false;
            localDelivery = false;

            message =
                    "₹70 delivery charge. Only Online Payment is available.";
        }

        return new DeliveryCheckResponse(
                distance,
                true,
                codAvailable,
                deliveryCharge,
                localDelivery,
                message
        );
    }

    public DeliveryCheckResponse checkDeliveryAvailability(
            double customerLatitude,
            double customerLongitude
    ) {

        double distance =
                calculateDistance(
                        customerLatitude,
                        customerLongitude
                );

        return getDeliveryDetails(distance);
    }
}