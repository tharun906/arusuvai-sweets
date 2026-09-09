package com.arusuvai.customer;

import com.arusuvai.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {

    Optional<CustomerEntity> findByPhoneNumber(String phoneNumber);

    long countByRole(Role role);

    List<CustomerEntity> findByRoleAndActiveTrue(Role role);
}