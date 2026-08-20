package com.arusuvai.payment;

import com.arusuvai.order.OrderResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<String> verifyPayment(@RequestBody PaymentVerifyRequestDTO request, Authentication authentication) {
        Long customerId = Long.parseLong(authentication.getName());
        paymentService.verifyPayment(request, customerId);

        return ResponseEntity.ok("Payment Verified Successfully");
    }

//    @PostMapping("/failed/{orderId}")
//    public ResponseEntity<OrderResponseDTO> paymentFailed(@PathVariable Long orderId) {
//        return ResponseEntity.ok(paymentService.markPaymentFailed(orderId));
//    }

    @PostMapping("/failed/{orderId}")
    public ResponseEntity<OrderResponseDTO> paymentFailed(
            @PathVariable Long orderId,
            Authentication authentication) {

        Long customerId =
                Long.parseLong(authentication.getName());

        return ResponseEntity.ok(
                paymentService.markPaymentFailed(
                        orderId,
                        customerId
                )
        );
    }

    //later id dns got ,https://your-domain.com/api/payments/webhook
    @PostMapping("/webhook")
    public ResponseEntity<Void> handleWebhook(@RequestBody String payload, @RequestHeader("X-Razorpay-Signature") String signature) {
        paymentService.handleWebhook(payload, signature);

        return ResponseEntity.ok().build();
    }
}
