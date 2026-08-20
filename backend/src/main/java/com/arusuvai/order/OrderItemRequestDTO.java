package com.arusuvai.order;

import jakarta.validation.constraints.*;
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
    @Max(100)
    private Integer quantity;
}