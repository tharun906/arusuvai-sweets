package com.arusuvai.checkout;

import org.springframework.stereotype.Service;

@Service
public class DeliveryService {

    // Radius of the Earth in kilometers.
    private static final double EARTH_RADIUS_KM = 6371.0;

    public double calculateDistance(double customerLatitude, double customerLongitude) {

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

    public DeliveryCheckResponse checkDeliveryAvailability(double customerLatitude, double customerLongitude) {

        double distance = calculateDistance(customerLatitude, customerLongitude);
        boolean withinDeliveryArea = distance <= DeliveryConstants.MAX_DELIVERY_DISTANCE_KM;

        String message;

        if (withinDeliveryArea) {
            message =  "Cash on Delivery and Online Payment are available.";
        } else {
            message =  "Outside our delivery area. Only Online Payment is available.";
        }

        return new DeliveryCheckResponse(
                distance,
                withinDeliveryArea,
                withinDeliveryArea,
                message
        );
    }
}