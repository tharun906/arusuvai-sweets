package com.arusuvai.payment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//after paid ,razorpay sends the rsponse to verify
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }


    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody PaymentVerifyRequestDTO request) {
        paymentService.verifyPayment(request);
        return ResponseEntity.ok("Payment Verified Successfully");
    }

}
