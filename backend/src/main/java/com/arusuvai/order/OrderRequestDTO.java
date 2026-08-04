package com.arusuvai.order;

import com.arusuvai.enums.PaymentMethod;
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

    @NotNull
    private PaymentMethod paymentMethod;

    @NotEmpty
    @Valid
    private List<OrderItemRequestDTO> items;
}
