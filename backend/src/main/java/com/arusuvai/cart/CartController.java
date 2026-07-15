package com.arusuvai.cart;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cartjkhgkjhgkjhgkjhgjkhgjhg")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CartResponseDTO> addToCart(@Valid @RequestBody CartRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.addToCart(request));
    }



















}
