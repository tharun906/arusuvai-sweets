package com.arusuvai.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
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

        @Query("""
        SELECT COALESCE(SUM(o.totalAmount), 0)
        FROM OrderEntity o
        WHERE o.paymentStatus = com.arusuvai.order.PaymentStatus.PAID
    """)
        BigDecimal getTotalSales();

    Optional<OrderEntity> findByRazorpayOrderId(String razorpayOrderId);
}
