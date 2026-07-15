package com.arusuvai.cart;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    Optional<CartEntity> findByCustomerIdAndProductIdAndWeight(
            Long customerId,
            Long productId,
            String weight
    );
}
