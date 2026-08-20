package com.arusuvai.customer;

import com.arusuvai.auth.dto.response.AuthResponse;

import java.util.List;

public interface CustomerService {

    CustomerResponseDTO createCustomer(CustomerRequestDTO request);

    List<CustomerResponseDTO> getAllCustomers();

    CustomerResponseDTO getCustomerById(Long id);

    CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO request);

    AuthResponse completeProfile(String googleSubject, CustomerRequestDTO request);

    CustomerResponseDTO verifyPhone(String googleSubject, String phoneNumber);

    CustomerResponseDTO updateMyProfile(
            String googleSubject,
            CustomerRequestDTO request
    );
}
