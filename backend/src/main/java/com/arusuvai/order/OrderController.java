package com.arusuvai.order;


import com.arusuvai.enums.PaymentMethod;
import com.arusuvai.payment.PaymentResponseDTO;
import com.arusuvai.payment.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//WHEN THE USER CLICKS PAY NOW
@RestController
@RequestMapping("api/orders")
public class OrderController {

    private final OrderService orderService;
    private final PaymentService paymentService;

    public OrderController(OrderService service, PaymentService paymentService) {
        this.orderService = service;
        this.paymentService= paymentService;
    }

    @PostMapping
    public ResponseEntity<OrderCreationResponseDTO> createOrder(@Valid @RequestBody OrderRequestDTO request, Authentication authentication) {

        Long customerId = Long.parseLong(authentication.getName());
        request.setCustomerId(customerId);
        OrderResponseDTO order = orderService.createOrder(request);

        if (request.getPaymentMethod() == PaymentMethod.COD) {
            OrderCreationResponseDTO response = new OrderCreationResponseDTO(
                            order.getOrderId(),
                            PaymentMethod.COD,
                            false,
                            null
                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);
        }

        PaymentResponseDTO payment = paymentService.createPaymentOrder(order.getOrderId(), order.getTotalAmount());

        OrderCreationResponseDTO response = new OrderCreationResponseDTO(
                        order.getOrderId(),
                        PaymentMethod.ONLINE,
                        true,
                        payment
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

//    @GetMapping("/customer/{customerId}")
//    public ResponseEntity<List<OrderResponseDTO>> getOrdersByCustomerId(@PathVariable Long customerId) {
//        return ResponseEntity.ok(orderService.getOrdersByCustomerId(customerId));
//    }

    @GetMapping("/customer")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders(
            Authentication authentication) {

        Long customerId =
                Long.parseLong(authentication.getName());

        return ResponseEntity.ok(
                orderService.getOrdersByCustomerId(customerId)
        );
    }

//    @GetMapping("/{orderId}")
//    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long orderId) {
//        return ResponseEntity.ok(orderService.getOrderById(orderId));
//    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponseDTO> getMyOrder(
            @PathVariable Long orderId,
            Authentication authentication) {

        Long customerId =
                Long.parseLong(authentication.getName());

        return ResponseEntity.ok(
                orderService.getOrderById(
                        orderId,
                        customerId
                )
        );
    }

    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponseDTO> cancelMyOrder(
            @PathVariable Long orderId,
            Authentication authentication) {

        Long customerId =
                Long.parseLong(authentication.getName());

        return ResponseEntity.ok(
                orderService.cancelOrder(
                        orderId,
                        customerId
                )
        );
    }
}
