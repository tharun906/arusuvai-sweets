package com.arusuvai.customer;

import com.arusuvai.enums.Role;
import com.razorpay.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
    Optional<CustomerEntity> findByPhoneNumber(String phoneNumber);
    long countByRole(Role role);
}
