package com.arusuvai.payment;

import com.arusuvai.order.OrderItemRequestDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PaymentRequestDTO {

    @NotNull
    private Long customerId;

    @NotEmpty
    @Valid
    private List<OrderItemRequestDTO> items;
}