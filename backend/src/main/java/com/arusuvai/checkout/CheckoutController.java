package com.arusuvai.checkout;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//WHEN THE USER CLICKS THE CHECKOUT
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;

    public CheckoutController(
            CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/summary")
    public ResponseEntity<CheckoutSummaryDTO> getSummary(@RequestBody @Valid CheckoutRequestDTO request) {
        return ResponseEntity.ok(checkoutService.getCheckoutSummary(request));
    }
}
