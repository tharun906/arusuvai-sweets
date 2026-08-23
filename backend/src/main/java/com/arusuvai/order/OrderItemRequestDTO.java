package com.arusuvai.order;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemRequestDTO {

    @NotNull
    private OrderItemType itemType;

    private Long productId;

    private Long sweetBoxId;

    private String weight;

    @NotNull
    @Min(1)
    @Max(100)
    private Integer quantity;
}