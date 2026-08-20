package com.arusuvai.customer;

import com.arusuvai.auth.dto.response.AuthResponse;
import com.arusuvai.exception.BusinessException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CustomerResponseDTO> createCustomer(@Valid @RequestBody CustomerRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createCustomer(request));
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getAllCustomers() {
        return ResponseEntity.ok(service.getAllCustomers());
    }

    //fix
//    @GetMapping("/{id}")
//    public ResponseEntity<CustomerResponseDTO> getCustomerById(@PathVariable Long id) {
//        return ResponseEntity.ok(service.getCustomerById(id));
//    }

    @GetMapping("/me")
    public ResponseEntity<CustomerResponseDTO> getMyCustomer(
            Authentication authentication) {

        Long customerId =
                Long.parseLong(authentication.getName());

        return ResponseEntity.ok(
                service.getCustomerById(customerId)
        );
    }

    //fix
//    @PutMapping("/{id}")
//    public ResponseEntity<CustomerResponseDTO> updateCustomer(@PathVariable Long id, @Valid @RequestBody CustomerRequestDTO request) {
//        return ResponseEntity.ok(service.updateCustomer(id, request));
//    }

    @PutMapping("/me")
    public ResponseEntity<CustomerResponseDTO> updateMyCustomer(@Valid @RequestBody CustomerRequestDTO request, Authentication authentication) {
        Long customerId = Long.parseLong(authentication.getName());

        return ResponseEntity.ok(service.updateCustomer(customerId, request));
    }

    @PostMapping("/profile")
    public ResponseEntity<AuthResponse> completeProfile(@Valid @RequestBody CustomerRequestDTO request, Authentication authentication) {

        if (authentication.getAuthorities() != null && !authentication.getAuthorities().isEmpty()) {
            throw new BusinessException("Only Google profile completion is allowed");
        }

        String googleSubject = authentication.getName();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.completeProfile(
                        googleSubject,
                        request
                ));
    }

    @PostMapping("/verify-phone")
    public ResponseEntity<CustomerResponseDTO> verifyPhone(
            @RequestBody @Valid PhoneVerificationRequestDTO request,
            Authentication authentication
    ) {

        String googleSubject = authentication.getName();

        return ResponseEntity.ok(
                service.verifyPhone(googleSubject, request.getPhoneNumber())
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<CustomerResponseDTO> updateMyProfile(
            @Valid @RequestBody CustomerRequestDTO request,
            Authentication authentication
    ) {

        String googleSubject = authentication.getName();

        return ResponseEntity.ok(
                service.updateMyProfile(googleSubject, request)
        );
    }
}
