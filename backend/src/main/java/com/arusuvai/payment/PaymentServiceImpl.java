package com.arusuvai.payment;

import com.arusuvai.config.RazorpayProperties;
import com.arusuvai.exception.BusinessException;
import com.arusuvai.exception.ResourceNotFoundException;
import com.arusuvai.order.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final OrderServiceImpl orderService;
    private final OrderRepository orderRepository;
    private final RazorpayProperties razorpayProperties;

    public PaymentServiceImpl(OrderRepository orderRepository, OrderServiceImpl orderService, RazorpayProperties razorpayProperties) {
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.razorpayProperties = razorpayProperties;
    }

    @Override
    public PaymentResponseDTO createPaymentOrder(Long orderId, BigDecimal totalAmount) {
        try {
            OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
            RazorpayClient razorpayClient = new RazorpayClient(razorpayProperties.getKeyId(), razorpayProperties.getKeySecret());
            JSONObject options = new JSONObject();
            int amount = totalAmount.multiply(new BigDecimal("100")).intValue();
            options.put("amount", amount);
            options.put("currency", "INR");
            options.put("receipt", "ORDER_" + orderId);
            Order razorpayOrder = razorpayClient.orders.create(options);
            String razorpayOrderId = razorpayOrder.get("id");
            Integer razorpayAmount = ((Number) razorpayOrder.get("amount")).intValue();
            String currency = razorpayOrder.get("currency");
            order.setRazorpayOrderId(razorpayOrderId);
            orderRepository.save(order);
            return new PaymentResponseDTO(orderId, razorpayOrderId, razorpayProperties.getKeyId(), razorpayAmount, currency);
        } catch (RazorpayException e) {
            throw new RuntimeException("Unable to create Razorpay Order", e);
        }
    }

    @Override
    public OrderResponseDTO verifyPayment(PaymentVerifyRequestDTO request, Long customerId) {
        JSONObject attributes = new JSONObject();
        attributes.put("razorpay_order_id", request.getRazorpayOrderId());
        attributes.put("razorpay_payment_id", request.getRazorpayPaymentId());
        attributes.put("razorpay_signature", request.getRazorpaySignature());
        try {
            boolean isValid = Utils.verifyPaymentSignature(attributes, razorpayProperties.getKeySecret());
            if (!isValid) throw new BusinessException("Invalid Payment Signature");

            OrderEntity order = orderRepository.findById(request.getOrderId()).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
            if (!order.getCustomer().getId().equals(customerId)) throw new BusinessException("You are not allowed to verify this order");
            if (!request.getRazorpayOrderId().equals(order.getRazorpayOrderId())) throw new BusinessException("Razorpay Order does not match our Order");

            order.setRazorpayPaymentId(request.getRazorpayPaymentId());
            orderRepository.save(order);
            return orderService.confirmOrder(request.getOrderId());
        } catch (RazorpayException e) {
            throw new RuntimeException("Payment Verification Failed", e);
        }
    }

    @Override
    @Transactional
    public OrderResponseDTO markPaymentFailed(Long orderId, Long customerId) {
        OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        if (!order.getCustomer().getId().equals(customerId)) throw new BusinessException("You are not allowed to modify this order");
        if (order.getPaymentStatus() == PaymentStatus.PAID) return orderService.getOrderByIdInternal(orderId);
        order.setPaymentStatus(PaymentStatus.FAILED);
        order.setOrderStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
        return orderService.getOrderByIdInternal(orderId);
    }

    @Override
    @Transactional
    public void handleWebhook(String payload, String signature) {
        try {
            boolean valid = Utils.verifyWebhookSignature(payload, signature, razorpayProperties.getWebhookSecret());
            if (!valid) throw new BusinessException("Invalid Razorpay Webhook Signature");

            JSONObject webhook = new JSONObject(payload);
            String event = webhook.getString("event");
            if (!event.equals("payment.captured") && !event.equals("order.paid")) return;

            JSONObject payment = webhook.getJSONObject("payload").getJSONObject("payment").getJSONObject("entity");
            String razorpayOrderId = payment.getString("order_id");
            String razorpayPaymentId = payment.getString("id");

            OrderEntity order = orderRepository.findByRazorpayOrderId(razorpayOrderId)
                    .orElseThrow(() -> new ResourceNotFoundException("Order not found for Razorpay Order ID"));

            if (order.getRazorpayPaymentId() == null) {
                order.setRazorpayPaymentId(razorpayPaymentId);
                orderRepository.save(order);
            }
            orderService.confirmOrder(order.getId());
        } catch (Exception e) {
            throw new RuntimeException("Razorpay Webhook Processing Failed", e);
        }
    }

    @Override
    @Transactional
    public BigDecimal refundPayment(Long orderId, BigDecimal refundAmount) {
        OrderEntity order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        if (order.getPaymentStatus() != PaymentStatus.PAID) throw new BusinessException("Only paid orders can be refunded");
        if (order.getRazorpayPaymentId() == null || order.getRazorpayPaymentId().isBlank()) throw new BusinessException("Razorpay payment ID not found for this order");
        if (refundAmount == null || refundAmount.compareTo(BigDecimal.ZERO) <= 0) throw new BusinessException("Invalid refund amount");
        if (refundAmount.compareTo(order.getTotalAmount()) > 0) throw new BusinessException("Refund amount cannot exceed order amount");

        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayProperties.getKeyId(), razorpayProperties.getKeySecret());
            JSONObject refundRequest = new JSONObject();
            int refundAmountInPaise = refundAmount.multiply(new BigDecimal("100")).intValueExact();
            refundRequest.put("amount", refundAmountInPaise);
            refundRequest.put("receipt", "REFUND_ORDER_" + orderId);
            com.razorpay.Refund refund = razorpayClient.payments.refund(order.getRazorpayPaymentId(), refundRequest);
            Integer refundedAmountInPaise = ((Number) refund.get("amount")).intValue();
            return BigDecimal.valueOf(refundedAmountInPaise).divide(new BigDecimal("100"));
        } catch (RazorpayException e) {
            throw new BusinessException("Unable to process Razorpay refund");
        } catch (ArithmeticException e) {
            throw new BusinessException("Invalid refund amount");
        }
    }
}