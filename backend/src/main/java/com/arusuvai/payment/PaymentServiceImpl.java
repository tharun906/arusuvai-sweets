package com.arusuvai.payment;

import com.arusuvai.order.OrderResponseDTO;
import com.arusuvai.order.OrderService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.razorpay.Utils;

import java.math.BigDecimal;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final OrderService orderService;

    public PaymentServiceImpl(OrderService orderService) {
        this.orderService = orderService;
    }

    // Razorpay API credentials loaded from application.properties
    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    @Override
    public PaymentResponseDTO createPaymentOrder(Long orderId, BigDecimal totalAmount) {

        try {
            // Create a secure Razorpay client using merchant credentials.
            RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);


            // Prepare the request body expected by Razorpay.
            JSONObject options = new JSONObject();
            int amount = totalAmount.multiply(new BigDecimal("100")).intValue();
            options.put("currency", "INR");
            options.put("receipt", "ORDER_" + orderId);

            // Create a Payment Order in Razorpay.
            // It simply creates a payment request.
            Order razorpayOrder = razorpayClient.orders.create(options);

            // Extract the details returned by Razorpay.
            String razorpayOrderId = razorpayOrder.get("id");
            Integer razorpayAmount =
                    ((Number) razorpayOrder.get("amount")).intValue();
            String currency = razorpayOrder.get("currency");

            // Return the payment details to React.
            // React uses these values to open the Razorpay Checkout popup.
            return new PaymentResponseDTO(razorpayOrderId, keyId, razorpayAmount, currency);

        } catch (RazorpayException e) {
            throw new RuntimeException("Unable to create Razorpay Order", e);
        }
    }

    /**
     * Verifies the payment after the customer completes payment.
     *
     * Flow:
     * React -> Spring Boot -> Verify Signature
     * -> Create Arusuvai Order
     */
    @Override
    public void verifyPayment(PaymentVerifyRequestDTO request) {

        // Prepare the payment details required for signature verification.
        JSONObject attributes = new JSONObject();

        attributes.put("razorpay_order_id", request.getRazorpayOrderId());
        attributes.put("razorpay_payment_id", request.getRazorpayPaymentId());
        attributes.put("razorpay_signature", request.getRazorpaySignature());

        try {

            // Verify whether the payment response is genuinely
            // received from Razorpay and has not been tampered with.
            boolean isValid = Utils.verifyPaymentSignature(attributes, keySecret);

            if (!isValid) {
                throw new RuntimeException("Invalid Payment Signature");
            }
        } catch (RazorpayException e) {
            throw new RuntimeException("Payment Verification Failed", e);
        }
    }
}