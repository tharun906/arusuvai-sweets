package com.arusuvai.auth.dto.controller;

import com.arusuvai.auth.dto.GoogleLoginRequest;
import com.arusuvai.auth.dto.OtpVerifyRequest;
import com.arusuvai.auth.dto.PhoneLoginRequest;
import com.arusuvai.auth.dto.RegisterCustomerRequest;
import com.arusuvai.auth.dto.response.AuthResponse;
import com.arusuvai.auth.dto.response.MessageResponse;
import com.arusuvai.auth.dto.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/check-phone")
    public ResponseEntity<AuthResponse> checkPhone(
            @Valid @RequestBody PhoneLoginRequest request,
            Authentication authentication) {

        AuthResponse response =
                authService.checkPhone(
                        request,
                        authentication
                );

        return ResponseEntity.ok(response);
    }


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerCustomer(@Valid @RequestBody RegisterCustomerRequest request
    ) {
        AuthResponse response = authService.registerCustomer(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);

    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(
            @RequestBody GoogleLoginRequest request) {

        AuthResponse response = authService.googleLogin(request);

        return ResponseEntity.ok(response);
    }
}