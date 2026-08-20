package com.arusuvai.checkout;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//WHEN THE USER CLICKS THE CHECKOUT
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;
    private final DeliveryService deliveryService;

    public CheckoutController(CheckoutService checkoutService, DeliveryService deliveryService) {
        this.checkoutService = checkoutService;
        this.deliveryService = deliveryService;
    }

//    @PostMapping("/summary")
//    public ResponseEntity<CheckoutSummaryDTO> getSummary(@RequestBody @Valid CheckoutRequestDTO request) {
//        return ResponseEntity.ok(checkoutService.getCheckoutSummary(request));
//    }

    @PostMapping("/summary")
    public ResponseEntity<CheckoutSummaryDTO> getSummary(@RequestBody @Valid CheckoutRequestDTO request, Authentication authentication) {
        Long customerId = Long.parseLong(authentication.getName());
        request.setCustomerId(customerId);

        return ResponseEntity.ok(checkoutService.getCheckoutSummary(request));
    }

    @PostMapping("/check-delivery")
    public ResponseEntity<DeliveryCheckResponse> checkDelivery(@RequestBody DeliveryCheckRequest request) {
        DeliveryCheckResponse response = deliveryService.checkDeliveryAvailability(request.getLatitude(), request.getLongitude());
        return ResponseEntity.ok(response);
    }
}
