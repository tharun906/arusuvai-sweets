package com.arusuvai.order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
    List<OrderEntity> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<OrderEntity> findAllByOrderByCreatedAtDesc();
    List<OrderEntity> findByOrderStatusOrderByCreatedAtDesc(OrderStatus orderStatus);
}
