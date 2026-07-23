package com.arusuvai.order;


import com.arusuvai.payment.PaymentResponseDTO;
import com.arusuvai.payment.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<PaymentResponseDTO> createOrder(@Valid @RequestBody OrderRequestDTO request){
        OrderResponseDTO order = orderService.createOrder(request);
        PaymentResponseDTO payment = paymentService.createPaymentOrder(order.getOrderId(), order.getTotalAmount());

        return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(orderService.getOrdersByCustomerId(customerId));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }
}
