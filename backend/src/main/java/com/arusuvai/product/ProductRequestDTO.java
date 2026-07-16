package com.arusuvai.product;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductRequestDTO {

    @NotBlank(message = "Product name is required")
    @Size(max = 100)
    private String name;

    private String description;

    private String imageUrl;

    @NotNull
    @DecimalMin(value = "0.00")
    private BigDecimal price250g;

    @NotNull
    @DecimalMin(value = "0.00")
    private BigDecimal price500g;

    @NotNull
    @DecimalMin(value = "0.00")
    private BigDecimal price1kg;

    @NotNull
    @PositiveOrZero
    private BigDecimal currentStockKg;

    @NotNull
    @PositiveOrZero
    private BigDecimal lowStockAlertKg;

    @NotNull
    private Long categoryId;
}
