package com.arusuvai.notification;

import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.enums.PaymentMethod;
import com.arusuvai.enums.Role;
import com.arusuvai.order.OrderEntity;
import com.arusuvai.order.OrderItemEntity;
import com.arusuvai.order.OrderItemType;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderEmailService {
    private final EmailService emailService;
    private final CustomerRepository customerRepository;

    public OrderEmailService(EmailService emailService, CustomerRepository customerRepository) {
        this.emailService = emailService;
        this.customerRepository = customerRepository;
    }

    public void sendOrderSuccessfulEmail(String customerEmail, String customerName, String orderNumber, String orderDetails) {
        String htmlContent = """
                <!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                <body style="margin:0;padding:0;background-color:#f5f3ed;font-family:Arial,Helvetica,sans-serif;color:#24352d;">
                <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e6dfc9;">
                <div style="background:#072119;padding:24px;text-align:center;"><div style="color:#fdcb13;font-size:24px;font-weight:bold;letter-spacing:2px;">ARUSUVAI SWEETS</div><div style="margin-top:8px;color:#fff;font-size:16px;">Order Successful ✓</div></div>
                <div style="padding:30px 28px;"><p style="margin:0 0 18px;font-size:16px;">Hello <strong>%s</strong>,</p>
                <p style="margin:0 0 22px;line-height:1.6;font-size:15px;">Thank you for ordering from Arusuvai Sweets. Your order has been placed successfully.</p>
                <div style="background:#f8f5e9;border-left:4px solid #d4af37;padding:14px 16px;margin-bottom:24px;"><div style="font-size:13px;color:#777;">Order Number</div><div style="margin-top:4px;font-size:18px;font-weight:bold;color:#072119;">#%s</div></div>
                <h3 style="margin:0 0 14px;color:#072119;font-size:17px;">Order Details</h3>
                <div style="border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;padding:14px 0;line-height:1.8;font-size:14px;">%s</div>
                <p style="margin:24px 0 0;line-height:1.6;font-size:14px;color:#555;">Your order is now being prepared. We will keep you informed about important order updates through email.</p>
                <p style="margin:24px 0 0;text-align:center;color:#072119;font-weight:bold;">Thank you for choosing Arusuvai Sweets ❤️</p></div>
                <div style="background:#072119;padding:16px;text-align:center;color:#cfcfcf;font-size:12px;">© Arusuvai Sweets</div></div>
                </body></html>
                """.formatted(customerName, orderNumber, orderDetails);
        emailService.sendEmail(customerEmail, "Arusuvai Sweets - Order Successful", htmlContent);
    }

    public String buildOrderDetails(OrderEntity order) {
        StringBuilder details = new StringBuilder();
        for (OrderItemEntity item : order.getOrderItems()) {
            String itemName = item.getItemType() == OrderItemType.PRODUCT ? item.getProduct().getName() : item.getSweetBox().getName();
            details.append("""
                    <div style="display:flex;justify-content:space-between;padding:6px 0;"><span>%s × %s</span><strong>₹%s</strong></div>
                    """.formatted(itemName, item.getQuantity(), item.getTotalPrice()));
        }
        details.append("""
                <div style="margin-top:12px;padding-top:12px;border-top:1px solid #ddd;display:flex;justify-content:space-between;font-size:16px;color:#072119;"><strong>Total</strong><strong>₹%s</strong></div>
                """.formatted(order.getTotalAmount()));
        return details.toString();
    }

    public void sendOrderDeliveredEmail(String customerEmail, String customerName, String orderNumber) {
        String htmlContent = """
                <!DOCTYPE html><html><body style="margin:0;padding:0;background:#f5f3ed;font-family:Arial,Helvetica,sans-serif;">
                <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;">
                <div style="background:#072119;padding:24px;text-align:center;color:#fdcb13;font-size:24px;font-weight:bold;letter-spacing:2px;">ARUSUVAI SWEETS</div>
                <div style="padding:30px;"><h2 style="color:#072119;margin-top:0;">Order Delivered ✓</h2>
                <p>Hello <strong>%s</strong>,</p><p style="line-height:1.6;">Your order <strong>#%s</strong> has been delivered successfully.</p>
                <p style="line-height:1.6;color:#555;">We hope you enjoy your sweets!</p>
                <p style="text-align:center;margin-top:28px;font-weight:bold;color:#072119;">Thank you for choosing Arusuvai Sweets ❤️</p></div>
                <div style="background:#072119;padding:16px;text-align:center;color:#cfcfcf;font-size:12px;">© Arusuvai Sweets</div></div>
                </body></html>
                """.formatted(customerName, orderNumber);
        emailService.sendEmail(customerEmail, "Arusuvai Sweets - Order Delivered", htmlContent);
    }

    public void sendCourierDispatchedEmail(String customerEmail, String customerName, String orderNumber) {
        String htmlContent = """
                <!DOCTYPE html><html><body style="margin:0;padding:0;background:#f5f3ed;font-family:Arial,Helvetica,sans-serif;">
                <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;">
                <div style="background:#072119;padding:24px;text-align:center;color:#fdcb13;font-size:24px;font-weight:bold;letter-spacing:2px;">ARUSUVAI SWEETS</div>
                <div style="padding:30px;"><h2 style="color:#072119;margin-top:0;">Your Order Has Been Dispatched 📦</h2>
                <p>Hello <strong>%s</strong>,</p><p style="line-height:1.6;">Your order <strong>#%s</strong> has been handed over to our courier partner and is now on its way to you.</p>
                <p style="text-align:center;margin-top:28px;font-weight:bold;color:#072119;">Thank you for choosing Arusuvai Sweets ❤️</p></div>
                <div style="background:#072119;padding:16px;text-align:center;color:#cfcfcf;font-size:12px;">© Arusuvai Sweets</div></div>
                </body></html>
                """.formatted(customerName, orderNumber);
        emailService.sendEmail(customerEmail, "Arusuvai Sweets - Your Order Has Been Couriered", htmlContent);
    }

    public void sendRefundInitiatedEmail(String customerEmail, String customerName, String orderNumber, BigDecimal orderAmount, BigDecimal refundAmount) {
        String htmlContent = """
                <!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                <body style="margin:0;padding:0;background:#f5f3ed;font-family:Arial,Helvetica,sans-serif;color:#24352d;">
                <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e6dfc9;">
                <div style="background:#072119;padding:24px;text-align:center;"><div style="color:#fdcb13;font-size:24px;font-weight:bold;letter-spacing:2px;">ARUSUVAI SWEETS</div><div style="margin-top:8px;color:#fff;font-size:16px;">Refund Initiated</div></div>
                <div style="padding:30px 28px;"><p style="margin:0 0 18px;font-size:16px;">Hello <strong>%s</strong>,</p>
                <p style="margin:0 0 22px;line-height:1.6;font-size:15px;">Your order <strong>#%s</strong> has been cancelled successfully.</p>
                <div style="background:#f8f5e9;border-left:4px solid #d4af37;padding:16px;margin-bottom:24px;"><div style="font-size:13px;color:#777;">Original Order Amount</div><div style="margin-top:4px;font-size:18px;font-weight:bold;color:#072119;">₹%s</div><div style="margin-top:16px;font-size:13px;color:#777;">Refund Amount</div><div style="margin-top:4px;font-size:20px;font-weight:bold;color:#072119;">₹%s</div></div>
                <p style="margin:0;line-height:1.6;font-size:14px;color:#555;">Your refund has been initiated through the payment gateway. The refunded amount will be credited back to your original payment method according to your bank or payment provider's processing time.</p>
                <p style="margin:24px 0 0;text-align:center;color:#072119;font-weight:bold;">Thank you for choosing Arusuvai Sweets ❤️</p></div>
                <div style="background:#072119;padding:16px;text-align:center;color:#cfcfcf;font-size:12px;">© Arusuvai Sweets</div></div>
                </body></html>
                """.formatted(customerName, orderNumber, orderAmount, refundAmount);
        emailService.sendEmail(customerEmail, "Arusuvai Sweets - Refund Initiated", htmlContent);
    }

    public void sendAdminNewOrderEmail(String orderNumber, String customerName, PaymentMethod paymentMethod, BigDecimal totalAmount, String orderDetails) {
        String htmlContent = """
                <!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                <body style="margin:0;padding:0;background:#f5f3ed;font-family:Arial,Helvetica,sans-serif;color:#24352d;">
                <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e6dfc9;">
                <div style="background:#072119;padding:24px;text-align:center;"><div style="color:#fdcb13;font-size:24px;font-weight:bold;letter-spacing:2px;">ARUSUVAI SWEETS</div><div style="margin-top:8px;color:#fff;font-size:16px;">New Order 🔔</div></div>
                <div style="padding:30px 28px;"><p style="margin:0 0 18px;font-size:16px;">A new order has been placed.</p>
                <div style="background:#f8f5e9;border-left:4px solid #d4af37;padding:14px 16px;margin-bottom:24px;"><div style="font-size:13px;color:#777;">Order Number</div><div style="margin-top:4px;font-size:18px;font-weight:bold;color:#072119;">#%s</div><div style="margin-top:14px;font-size:13px;color:#777;">Customer</div><div style="margin-top:4px;font-size:16px;font-weight:bold;color:#072119;">%s</div><div style="margin-top:14px;font-size:13px;color:#777;">Payment Method</div><div style="margin-top:4px;font-size:16px;font-weight:bold;color:#072119;">%s</div></div>
                <h3 style="margin:0 0 14px;color:#072119;font-size:17px;">Order Details</h3><div style="border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;padding:14px 0;line-height:1.8;font-size:14px;">%s</div>
                <div style="margin-top:20px;text-align:right;font-size:17px;font-weight:bold;color:#072119;">Total: ₹%s</div></div>
                <div style="background:#072119;padding:16px;text-align:center;color:#cfcfcf;font-size:12px;">Arusuvai Sweets - Admin Notification</div></div>
                </body></html>
                """.formatted(orderNumber, customerName, paymentMethod == PaymentMethod.ONLINE ? "UPI / Online Payment" : "Cash on Delivery", orderDetails, totalAmount);

        List<CustomerEntity> admins = customerRepository.findByRoleAndActiveTrue(Role.ADMIN);
        for (CustomerEntity admin : admins)
            if (admin.getEmail() != null && !admin.getEmail().isBlank())
                emailService.sendEmail(admin.getEmail(), "Arusuvai Sweets - New Order #" + orderNumber, htmlContent);
    }

    public void sendAdminOrderCancelledEmail(String orderNumber, String customerName, PaymentMethod paymentMethod, BigDecimal orderAmount, BigDecimal refundAmount) {
        boolean refunded = refundAmount != null && refundAmount.compareTo(BigDecimal.ZERO) > 0;
        String refundSection = refunded
                ? """
                    <div style="margin-top:18px;background:#f8f5e9;border-left:4px solid #d4af37;padding:14px 16px;"><div style="font-size:13px;color:#777;">Refund Amount</div><div style="margin-top:4px;font-size:18px;font-weight:bold;color:#072119;">₹%s</div></div>
                    """.formatted(refundAmount)
                : """
                    <div style="margin-top:18px;background:#f8f5e9;border-left:4px solid #d4af37;padding:14px 16px;"><div style="font-size:14px;color:#555;">No payment was collected for this order.</div></div>
                    """;

        String htmlContent = """
                <!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                <body style="margin:0;padding:0;background:#f5f3ed;font-family:Arial,Helvetica,sans-serif;color:#24352d;">
                <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e6dfc9;">
                <div style="background:#072119;padding:24px;text-align:center;"><div style="color:#fdcb13;font-size:24px;font-weight:bold;letter-spacing:2px;">ARUSUVAI SWEETS</div><div style="margin-top:8px;color:#fff;font-size:16px;">Order Cancelled</div></div>
                <div style="padding:30px 28px;"><p style="margin:0 0 18px;font-size:16px;">An order has been cancelled by the customer.</p>
                <div style="background:#f8f5e9;border-left:4px solid #d4af37;padding:14px 16px;margin-bottom:24px;"><div style="font-size:13px;color:#777;">Order Number</div><div style="margin-top:4px;font-size:18px;font-weight:bold;color:#072119;">#%s</div><div style="margin-top:14px;font-size:13px;color:#777;">Customer</div><div style="margin-top:4px;font-size:16px;font-weight:bold;color:#072119;">%s</div><div style="margin-top:14px;font-size:13px;color:#777;">Payment Method</div><div style="margin-top:4px;font-size:16px;font-weight:bold;color:#072119;">%s</div><div style="margin-top:14px;font-size:13px;color:#777;">Original Order Amount</div><div style="margin-top:4px;font-size:16px;font-weight:bold;color:#072119;">₹%s</div>%s</div>
                <p style="margin:0;line-height:1.6;font-size:14px;color:#555;">Please review the cancelled order in the admin panel.</p></div>
                <div style="background:#072119;padding:16px;text-align:center;color:#cfcfcf;font-size:12px;">Arusuvai Sweets - Admin Notification</div></div>
                </body></html>
                """.formatted(orderNumber, customerName, paymentMethod == PaymentMethod.ONLINE ? "UPI / Online Payment" : "Cash on Delivery", orderAmount, refundSection);

        List<CustomerEntity> admins = customerRepository.findByRoleAndActiveTrue(Role.ADMIN);
        for (CustomerEntity admin : admins)
            if (admin.getEmail() != null && !admin.getEmail().isBlank())
                emailService.sendEmail(admin.getEmail(), refunded ? "Arusuvai Sweets - Order Cancelled + Refund" : "Arusuvai Sweets - Order Cancelled", htmlContent);
    }
}