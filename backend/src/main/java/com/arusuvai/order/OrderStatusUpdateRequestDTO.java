package com.arusuvai.order;

//the admin decided to change the status of stock

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderStatusUpdateRequestDTO {
    private OrderStatus orderStatus;
}
