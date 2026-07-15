package com.arusuvai.cart;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartRequestDTO {

    @NotNull
    private Long customerId;

    @NotNull
    private Long productId;

    @NotBlank
    @Pattern(regexp = "250g|500g|1kg",
            message = "Weight must be 250g, 500g or 1kg")
    private String weight;

    @NotNull
    @Min(1)
    private Integer quantity;
}
