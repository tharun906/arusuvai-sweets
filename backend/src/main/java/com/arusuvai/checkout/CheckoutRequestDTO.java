package com.arusuvai.checkout;

import com.arusuvai.order.OrderItemRequestDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CheckoutRequestDTO {
    @NotNull
    private Long customerId;

    @NotEmpty
    @Valid
    private List<OrderItemRequestDTO> items;

    public CheckoutRequestDTO(Long customerId, List<OrderItemRequestDTO> items) {
        this.customerId = customerId;
        this.items = items;
    }

    public CheckoutRequestDTO() {}
}
