package com.arusuvai.payment;

import com.arusuvai.config.RazorpayProperties;
import com.arusuvai.order.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.springframework.transaction.annotation.Transactional;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import com.razorpay.Utils;

import java.math.BigDecimal;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final OrderServiceImpl orderService;
    private final OrderRepository orderRepository;
    private final RazorpayProperties razorpayProperties;

    public PaymentServiceImpl(
            OrderRepository orderRepository,
            OrderServiceImpl orderService,
            RazorpayProperties razorpayProperties) {

        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.razorpayProperties = razorpayProperties;
    }


    @Override
    public PaymentResponseDTO createPaymentOrder(Long orderId, BigDecimal totalAmount){
        try {

            OrderEntity order = orderRepository.findById(orderId)
                    .orElseThrow(() ->
                            new RuntimeException("Order not found"));
            // 2. Create Razorpay Client
            RazorpayClient razorpayClient = new RazorpayClient(razorpayProperties.getKeyId(), razorpayProperties.getKeySecret());

            // 3. Prepare Razorpay Order Request
            JSONObject options = new JSONObject();

            //for razorpay amount unit
            int amount = totalAmount.multiply(new BigDecimal("100")).intValue();

            options.put("amount", amount);
            options.put("currency", "INR");
            options.put("receipt", "ORDER_" + orderId);

            // 4. Create Razorpay Order
            Order razorpayOrder = razorpayClient.orders.create(options);

            // 5. Extract Razorpay Response
            String razorpayOrderId = razorpayOrder.get("id");
            Integer razorpayAmount = ((Number) razorpayOrder.get("amount")).intValue();
            String currency = razorpayOrder.get("currency");

            order.setRazorpayOrderId(razorpayOrderId);
            orderRepository.save(order);

            // 6. Return Response to React
            return new PaymentResponseDTO(
                    orderId,
                    razorpayOrderId,
                    razorpayProperties.getKeyId(),
                    razorpayAmount,
                    currency);

        } catch (RazorpayException e) {
            throw new RuntimeException(
                    "Unable to create Razorpay Order", e);
        }
    }

    @Override
    public OrderResponseDTO verifyPayment(PaymentVerifyRequestDTO request) {

        JSONObject attributes = new JSONObject();

        attributes.put("razorpay_order_id", request.getRazorpayOrderId());
        attributes.put("razorpay_payment_id", request.getRazorpayPaymentId());
        attributes.put("razorpay_signature", request.getRazorpaySignature());

        try {
//            Received Order ID
//                    +
//             Received Payment ID
//                     │
//                     ▼
//            Generate a NEW signature
//            using YOUR keySecret
//                     │
//                     ▼
//            generatedSignature

            //compares the regenerated signature with the received Razorpay signature.
            boolean isValid = Utils.verifyPaymentSignature(attributes, razorpayProperties.getKeySecret());
            if (!isValid) {throw new RuntimeException("Invalid Payment Signature");}

            OrderEntity order = orderRepository.findById(request.getOrderId())
                    .orElseThrow(() ->
                            new RuntimeException("Order not found"));

            if (!request.getRazorpayOrderId().equals(order.getRazorpayOrderId())) {
                throw new RuntimeException("Razorpay Order does not match our Order");
            }

            order.setRazorpayPaymentId(request.getRazorpayPaymentId());
            orderRepository.save(order);

            return orderService.confirmOrder(request.getOrderId());

        } catch (RazorpayException e) {
            throw new RuntimeException("Payment Verification Failed", e);
        }
    }

    @Override
    @Transactional
    public OrderResponseDTO markPaymentFailed(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        // Already successfully paid.
        // Never turn a paid order into FAILED.
        if (order.getPaymentStatus() == PaymentStatus.PAID) {
            return orderService.getOrderById(orderId);
        }

        order.setPaymentStatus(PaymentStatus.FAILED);
        order.setOrderStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        return orderService.getOrderById(orderId);
    }

    @Override
    @Transactional
    public void handleWebhook(String payload, String signature) {

        try {
            // 1. Verify webhook signature
            boolean valid = Utils.verifyWebhookSignature(payload, signature, razorpayProperties.getWebhookSecret());

            if (!valid) {
                throw new RuntimeException("Invalid Razorpay Webhook Signature");
            }

            // 2. Parse the event
            JSONObject webhook = new JSONObject(payload);

            String event =
                    webhook.getString("event");

            // 3. We only process successful payments
            if (!event.equals("payment.captured")
                    && !event.equals("order.paid")) {

                return;
            }

            JSONObject payment =
                    webhook
                            .getJSONObject("payload")
                            .getJSONObject("payment")
                            .getJSONObject("entity");

            String razorpayOrderId =
                    payment.getString("order_id");

            String razorpayPaymentId =
                    payment.getString("id");

            // 4. Find our order using Razorpay Order ID
            OrderEntity order =
                    orderRepository.findByRazorpayOrderId(razorpayOrderId)
                            .orElseThrow(() ->
                                    new RuntimeException("Order not found for Razorpay Order ID")
                            );

            // 5. Save payment ID if not already saved
            if (order.getRazorpayPaymentId() == null) {
                order.setRazorpayPaymentId(razorpayPaymentId);

                orderRepository.save(order);
            }

            // 6. confirmOrder() is already idempotent
            // so stock cannot be reduced twice.
            orderService.confirmOrder(order.getId());

        } catch (Exception e) {
            throw new RuntimeException("Razorpay Webhook Processing Failed", e);
        }
    }
}