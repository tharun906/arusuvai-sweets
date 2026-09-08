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
            double distance,
            BigDecimal totalWeightKg
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
         * Weight-based courier delivery
         * ₹50 per kg
         * Customer pays configured percentage
         * Online Payment only
         */
        else {

            BigDecimal courierCost =
                    totalWeightKg.multiply(
                            DeliveryConstants.COURIER_RATE_PER_KG
                    );

            deliveryCharge =
                    courierCost
                            .multiply(
                                    DeliveryConstants.COURIER_CUSTOMER_PERCENTAGE
                            )
                            .divide(
                                    BigDecimal.valueOf(100)
                            );

            codAvailable = false;
            localDelivery = false;

            message =
                    "Courier delivery charge: ₹"
                            + deliveryCharge
                            .stripTrailingZeros()
                            .toPlainString()
                            + ". Only Online Payment is available.";
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

    /*
     * Used by the delivery-location check endpoint.
     *
     * This endpoint does not know the customer's cart/order weight.
     * Therefore, it only determines delivery availability and distance.
     *
     * The actual weight-based courier charge is calculated during
     * checkout using getDeliveryDetails(distance, totalWeightKg).
     */
    public DeliveryCheckResponse checkDeliveryAvailability(
            double customerLatitude,
            double customerLongitude
    ) {

        double distance =
                calculateDistance(
                        customerLatitude,
                        customerLongitude
                );

        if (distance <= DeliveryConstants.FREE_DELIVERY_DISTANCE_KM) {

            return new DeliveryCheckResponse(
                    distance,
                    true,
                    true,
                    DeliveryConstants.FREE_DELIVERY_CHARGE,
                    true,
                    "Free delivery. Cash on Delivery and Online Payment are available."
            );

        } else if (distance <= DeliveryConstants.COD_MAX_DISTANCE_KM) {

            return new DeliveryCheckResponse(
                    distance,
                    true,
                    true,
                    DeliveryConstants.LOCAL_DELIVERY_CHARGE,
                    true,
                    "₹40 delivery charge. Cash on Delivery and Online Payment are available."
            );

        } else {

            return new DeliveryCheckResponse(
                    distance,
                    true,
                    false,
                    null,
                    false,
                    "Courier delivery. Only Online Payment is available."
            );
        }
    }
}