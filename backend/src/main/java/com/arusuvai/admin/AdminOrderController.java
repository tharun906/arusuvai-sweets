package com.arusuvai.admin;

import com.arusuvai.order.OrderResponseDTO;
import com.arusuvai.order.OrderService;
import com.arusuvai.order.OrderStatus;
import com.arusuvai.order.OrderStatusUpdateRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
    @GetMapping("/status/{status}")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByStatus(@PathVariable OrderStatus status) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(status)
        );
    }

//         PREPARING
//              │
//              ▼
//         OUT_FOR_DELIVERY
//              │
//              ▼
//         DELIVERED

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponseDTO> updateOrderStatus(@PathVariable Long orderId, @RequestBody OrderStatusUpdateRequestDTO request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, request.getOrderStatus()));
    }

    //LATER -
    // PREPARING → OUT_FOR_DELIVERY ✅
    //OUT_FOR_DELIVERY → DELIVERED ✅
    //DELIVERED → PREPARING ❌
    //PENDING_PAYMENT → DELIVERED ❌
}
