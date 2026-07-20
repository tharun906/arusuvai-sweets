package com.arusuvai.order;


import com.arusuvai.payment.PaymentResponseDTO;
import com.arusuvai.payment.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

        PaymentResponseDTO payment = paymentService.createPaymentOrder(
                        order.getOrderId(),
                        order.getTotalAmount());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(payment);
    }
}
