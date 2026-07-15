package com.arusuvai.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequestDTO {
    @NotNull
    private Long customerId;

    @NotEmpty
    @Valid
    private List<OrderItemRequestDTO> items;
}
