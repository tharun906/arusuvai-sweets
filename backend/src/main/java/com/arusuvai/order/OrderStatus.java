package com.arusuvai.order;

public enum OrderStatus {
    PENDING_PAYMENT,
    PREPARING,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELLED
}

// | Status           | Color     |
// | ---------------- | --------- |
// | PREPARING        | 🟡 Yellow |
// | OUT_FOR_DELIVERY | 🔵 Blue   |
// | DELIVERED        | 🟢 Green  |
// | PENDING_PAYMENT  | 🟠 Orange |
// | CANCELLED        | 🔴 Red    |
