package com.arusuvai.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
    List<OrderEntity> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<OrderEntity> findAllByOrderByCreatedAtDesc();
    List<OrderEntity> findByOrderStatusOrderByCreatedAtDesc(OrderStatus orderStatus);
    Optional<OrderEntity> findFirstByCustomerIdAndPaymentStatusOrderByCreatedAtDesc(
            Long customerId,
            PaymentStatus paymentStatus
    );
}
