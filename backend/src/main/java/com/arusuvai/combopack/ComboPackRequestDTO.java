package com.arusuvai.combopack;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ComboPackRequestDTO {

    @NotBlank(message = "Combo Pack title is required")
    @Size(max = 100)
    private String title;

    @NotBlank(message = "Combo Pack contents are required")
    private String contents;

    @NotBlank(message = "Combo Pack weight is required")
    @Size(max = 50)
    private String weight;

    @NotNull(message = "Combo Pack price is required")
    @DecimalMin(value = "0.00", message = "Price cannot be negative")
    private BigDecimal price;

    private String imageUrl;
}