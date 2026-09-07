package com.arusuvai.notification;

import com.arusuvai.order.OrderEntity;
import com.arusuvai.order.OrderItemEntity;
import com.arusuvai.order.OrderItemType;
import org.springframework.stereotype.Service;

@Service
public class OrderEmailService {

    private final EmailService emailService;

    public OrderEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void sendOrderSuccessfulEmail(
            String customerEmail,
            String customerName,
            String orderNumber,
            String orderDetails
    ) {
        emailService.sendEmail(
                customerEmail,
                "Arusuvai Sweets - Order Successful",
                "Hello " + customerName + ",\n\n" +
                        "Your order " + orderNumber + " has been placed successfully.\n\n" +
                        "Order Details:\n" +
                        orderDetails + "\n\n" +
                        "Thank you for ordering from Arusuvai Sweets!"
        );
    }

    public String buildOrderDetails(OrderEntity order) {

        StringBuilder details = new StringBuilder();

        for (OrderItemEntity item : order.getOrderItems()) {

            String itemName;

            if (item.getItemType() == OrderItemType.PRODUCT) {
                itemName = item.getProduct().getName();
            } else {
                itemName = item.getSweetBox().getName();
            }

            details.append(itemName)
                    .append(" × ")
                    .append(item.getQuantity())
                    .append(" - ₹")
                    .append(item.getTotalPrice())
                    .append("\n");
        }

        details.append("\nTotal: ₹")
                .append(order.getTotalAmount());

        return details.toString();
    }

    public void sendOrderDeliveredEmail(
            String customerEmail,
            String customerName,
            String orderNumber
    ) {
        emailService.sendEmail(
                customerEmail,
                "Arusuvai Sweets - Order Delivered",
                "Hello " + customerName + ",\n\n" +
                        "Your order " + orderNumber + " has been delivered successfully.\n\n" +
                        "Thank you for ordering from Arusuvai Sweets!"
        );
    }

    public void sendCourierDispatchedEmail(
            String customerEmail,
            String customerName,
            String orderNumber
    ) {
        emailService.sendEmail(
                customerEmail,
                "Arusuvai Sweets - Your Order Has Been Couriered",
                "Hello " + customerName + ",\n\n" +
                        "Your order " + orderNumber + " has been handed over to the courier and dispatched.\n\n" +
                        "Your order is now on its way to you.\n\n" +
                        "Thank you for ordering from Arusuvai Sweets!"
        );
    }

}