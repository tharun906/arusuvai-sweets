package com.arusuvai.auth.dto.response;

import com.arusuvai.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private boolean success;
    private String message;
    private boolean existingCustomer;
    private LoginResponse customer;
    private String token;
    private String googleVerificationToken;
    private String googleEmail;

    public AuthResponse(
            boolean success,
            String message,
            boolean existingCustomer,
            LoginResponse customer,
            String token,
            String googleVerificationToken
    ) {
        this.success = success;
        this.message = message;
        this.existingCustomer = existingCustomer;
        this.customer = customer;
        this.token = token;
        this.googleVerificationToken = googleVerificationToken;
        this.googleEmail = null;
    }

    public AuthResponse(
            boolean success,
            String message,
            boolean existingCustomer,
            LoginResponse customer,
            String token
    ) {
        this.success = success;
        this.message = message;
        this.existingCustomer = existingCustomer;
        this.customer = customer;
        this.token = token;
        this.googleVerificationToken = null;
        this.googleEmail = null;
    }
}