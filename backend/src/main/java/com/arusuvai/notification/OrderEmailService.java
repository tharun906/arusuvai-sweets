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

        String htmlContent = """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>

                <body style="
                    margin:0;
                    padding:0;
                    background-color:#f5f3ed;
                    font-family:Arial, Helvetica, sans-serif;
                    color:#24352d;
                ">

                    <div style="
                        max-width:600px;
                        margin:30px auto;
                        background:#ffffff;
                        border-radius:12px;
                        overflow:hidden;
                        border:1px solid #e6dfc9;
                    ">

                        <!-- Header -->
                        <div style="
                            background:#072119;
                            padding:24px;
                            text-align:center;
                        ">

                            <div style="
                                color:#fdcb13;
                                font-size:24px;
                                font-weight:bold;
                                letter-spacing:2px;
                            ">
                                ARUSUVAI SWEETS
                            </div>

                            <div style="
                                margin-top:8px;
                                color:#ffffff;
                                font-size:16px;
                            ">
                                Order Successful ✓
                            </div>

                        </div>


                        <!-- Content -->
                        <div style="padding:30px 28px;">

                            <p style="
                                margin:0 0 18px;
                                font-size:16px;
                            ">
                                Hello <strong>%s</strong>,
                            </p>

                            <p style="
                                margin:0 0 22px;
                                line-height:1.6;
                                font-size:15px;
                            ">
                                Thank you for ordering from Arusuvai Sweets.
                                Your order has been placed successfully.
                            </p>


                            <!-- Order number -->
                            <div style="
                                background:#f8f5e9;
                                border-left:4px solid #d4af37;
                                padding:14px 16px;
                                margin-bottom:24px;
                            ">

                                <div style="
                                    font-size:13px;
                                    color:#777777;
                                ">
                                    Order Number
                                </div>

                                <div style="
                                    margin-top:4px;
                                    font-size:18px;
                                    font-weight:bold;
                                    color:#072119;
                                ">
                                    #%s
                                </div>

                            </div>


                            <!-- Order details -->
                            <h3 style="
                                margin:0 0 14px;
                                color:#072119;
                                font-size:17px;
                            ">
                                Order Details
                            </h3>

                            <div style="
                                border-top:1px solid #e5e5e5;
                                border-bottom:1px solid #e5e5e5;
                                padding:14px 0;
                                line-height:1.8;
                                font-size:14px;
                            ">
                                %s
                            </div>


                            <!-- Footer message -->
                            <p style="
                                margin:24px 0 0;
                                line-height:1.6;
                                font-size:14px;
                                color:#555555;
                            ">
                                Your order is now being prepared.
                                We will keep you informed about important
                                order updates through email.
                            </p>

                            <p style="
                                margin:24px 0 0;
                                text-align:center;
                                color:#072119;
                                font-weight:bold;
                            ">
                                Thank you for choosing Arusuvai Sweets ❤️
                            </p>

                        </div>


                        <!-- Footer -->
                        <div style="
                            background:#072119;
                            padding:16px;
                            text-align:center;
                            color:#cfcfcf;
                            font-size:12px;
                        ">
                            © Arusuvai Sweets
                        </div>

                    </div>

                </body>
                </html>
                """.formatted(
                customerName,
                orderNumber,
                orderDetails
        );

        emailService.sendEmail(
                customerEmail,
                "Arusuvai Sweets - Order Successful",
                htmlContent
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

            details.append("""
                    <div style="
                        display:flex;
                        justify-content:space-between;
                        padding:6px 0;
                    ">
                        <span>%s × %s</span>
                        <strong>₹%s</strong>
                    </div>
                    """.formatted(
                    itemName,
                    item.getQuantity(),
                    item.getTotalPrice()
            ));
        }

        details.append("""
                <div style="
                    margin-top:12px;
                    padding-top:12px;
                    border-top:1px solid #dddddd;
                    display:flex;
                    justify-content:space-between;
                    font-size:16px;
                    color:#072119;
                ">
                    <strong>Total</strong>
                    <strong>₹%s</strong>
                </div>
                """.formatted(order.getTotalAmount()));

        return details.toString();
    }


    public void sendOrderDeliveredEmail(
            String customerEmail,
            String customerName,
            String orderNumber
    ) {

        String htmlContent = """
                <!DOCTYPE html>
                <html>
                <body style="
                    margin:0;
                    padding:0;
                    background:#f5f3ed;
                    font-family:Arial, Helvetica, sans-serif;
                ">

                    <div style="
                        max-width:600px;
                        margin:30px auto;
                        background:#ffffff;
                        border-radius:12px;
                        overflow:hidden;
                    ">

                        <div style="
                            background:#072119;
                            padding:24px;
                            text-align:center;
                            color:#fdcb13;
                            font-size:24px;
                            font-weight:bold;
                            letter-spacing:2px;
                        ">
                            ARUSUVAI SWEETS
                        </div>

                        <div style="padding:30px;">

                            <h2 style="
                                color:#072119;
                                margin-top:0;
                            ">
                                Order Delivered ✓
                            </h2>

                            <p>
                                Hello <strong>%s</strong>,
                            </p>

                            <p style="line-height:1.6;">
                                Your order <strong>#%s</strong>
                                has been delivered successfully.
                            </p>

                            <p style="line-height:1.6;color:#555;">
                                We hope you enjoy your sweets!
                            </p>

                            <p style="
                                text-align:center;
                                margin-top:28px;
                                font-weight:bold;
                                color:#072119;
                            ">
                                Thank you for choosing Arusuvai Sweets ❤️
                            </p>

                        </div>

                        <div style="
                            background:#072119;
                            padding:16px;
                            text-align:center;
                            color:#cfcfcf;
                            font-size:12px;
                        ">
                            © Arusuvai Sweets
                        </div>

                    </div>

                </body>
                </html>
                """.formatted(
                customerName,
                orderNumber
        );

        emailService.sendEmail(
                customerEmail,
                "Arusuvai Sweets - Order Delivered",
                htmlContent
        );
    }


    public void sendCourierDispatchedEmail(
            String customerEmail,
            String customerName,
            String orderNumber
    ) {

        String htmlContent = """
                <!DOCTYPE html>
                <html>
                <body style="
                    margin:0;
                    padding:0;
                    background:#f5f3ed;
                    font-family:Arial, Helvetica, sans-serif;
                ">

                    <div style="
                        max-width:600px;
                        margin:30px auto;
                        background:#ffffff;
                        border-radius:12px;
                        overflow:hidden;
                    ">

                        <div style="
                            background:#072119;
                            padding:24px;
                            text-align:center;
                            color:#fdcb13;
                            font-size:24px;
                            font-weight:bold;
                            letter-spacing:2px;
                        ">
                            ARUSUVAI SWEETS
                        </div>

                        <div style="padding:30px;">

                            <h2 style="color:#072119;margin-top:0;">
                                Your Order Has Been Dispatched 📦
                            </h2>

                            <p>
                                Hello <strong>%s</strong>,
                            </p>

                            <p style="line-height:1.6;">
                                Your order <strong>#%s</strong> has been
                                handed over to our courier partner and
                                is now on its way to you.
                            </p>

                            <p style="
                                text-align:center;
                                margin-top:28px;
                                font-weight:bold;
                                color:#072119;
                            ">
                                Thank you for choosing Arusuvai Sweets ❤️
                            </p>

                        </div>

                        <div style="
                            background:#072119;
                            padding:16px;
                            text-align:center;
                            color:#cfcfcf;
                            font-size:12px;
                        ">
                            © Arusuvai Sweets
                        </div>

                    </div>

                </body>
                </html>
                """.formatted(
                customerName,
                orderNumber
        );

        emailService.sendEmail(
                customerEmail,
                "Arusuvai Sweets - Your Order Has Been Couriered",
                htmlContent
        );
    }
}