package com.arusuvai.checkout;

import com.arusuvai.order.OrderItemRequestDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CheckoutRequestDTO {
    private Long customerId;
    private List<OrderItemRequestDTO> items;
}
