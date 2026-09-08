package com.arusuvai.util;

import java.math.BigDecimal;

public final class WeightConverter {

    private WeightConverter() {
    }

    public static BigDecimal toKg(String weight) {

        return switch (weight.toLowerCase()) {

            case "250g" -> new BigDecimal("0.25");

            case "500g" -> new BigDecimal("0.50");

            case "750g" -> new BigDecimal("0.75");

            case "1kg" -> BigDecimal.ONE;

            default ->
                    throw new IllegalArgumentException(
                            "Invalid weight: " + weight
                    );
        };
    }
}