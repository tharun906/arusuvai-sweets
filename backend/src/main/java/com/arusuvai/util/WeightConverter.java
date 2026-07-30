package com.arusuvai.util;


//What is a Utility?
//
//A utility is simply a helper class.
//It doesn't store data.
//It doesn't access the database.
//It just performs one small reusable task.

// AIM - This is exactly what enterprise applications aim for: Don't Repeat Yourself (DRY).

import java.math.BigDecimal;

public final class WeightConverter {
    private WeightConverter(){
    }

   public static BigDecimal toKg(String weight) {
    return switch (weight.toLowerCase()) {
        case "250g" -> new BigDecimal("0.25");
        case "500g" -> new BigDecimal("0.50");
        case "1kg" -> BigDecimal.ONE;
        default -> throw new IllegalArgumentException("Invalid weight: " + weight);
    };
}
}
