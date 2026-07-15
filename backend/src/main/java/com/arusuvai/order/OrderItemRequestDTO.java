package com.arusuvai.order;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemRequestDTO {

    @NotNull
    private Long productId;

    @NotBlank
    @Pattern(regexp = "250g|500g|1kg")
    private String weight;

    @NotNull
    @Min(1)
    private Integer quantity;
}