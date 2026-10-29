package com.arusuvai.payment;

import com.arusuvai.config.RazorpayProperties;
import com.arusuvai.enums.PaymentMethod;
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
    @Transactional
    public PaymentResponseDTO createPaymentOrder(Long orderId, BigDecimal ignoredAmount) {
        try {
            OrderEntity order = orderRepository.findByIdForUpdate(orderId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Order not found"));

            if (order.getPaymentMethod() != PaymentMethod.ONLINE) {
                throw new BusinessException("Order is not an online payment order");
            }

            if (order.getPaymentStatus() != PaymentStatus.PENDING
                    || order.getOrderStatus() != OrderStatus.PENDING_PAYMENT) {
                throw new BusinessException("Order is not awaiting payment");
            }

            BigDecimal totalAmount = order.getTotalAmount();
            int amountInPaise = toPaise(totalAmount);

            if (amountInPaise < 100) {
                throw new BusinessException("Minimum payment amount is ₹1");
            }

            RazorpayClient client = new RazorpayClient(
                    razorpayProperties.getKeyId(),
                    razorpayProperties.getKeySecret());

            if (order.getRazorpayOrderId() != null
                    && !order.getRazorpayOrderId().isBlank()) {

                Order existing = client.orders.fetch(order.getRazorpayOrderId());

                int existingAmount = ((Number) existing.get("amount")).intValue();
                String existingCurrency = existing.get("currency");
                String existingId = existing.get("id");

                if (!order.getRazorpayOrderId().equals(existingId)
                        || existingAmount != amountInPaise
                        || !"INR".equals(existingCurrency)) {
                    throw new BusinessException(
                            "Existing Razorpay order does not match this order");
                }

                return new PaymentResponseDTO(
                        orderId, existingId, razorpayProperties.getKeyId(),
                        existingAmount, existingCurrency);
            }

            JSONObject options = new JSONObject();
            options.put("amount", amountInPaise);
            options.put("currency", "INR");
            options.put("receipt", "ORDER_" + orderId);

            Order razorpayOrder = client.orders.create(options);

            String razorpayOrderId = razorpayOrder.get("id");
            int returnedAmount = ((Number) razorpayOrder.get("amount")).intValue();
            String returnedCurrency = razorpayOrder.get("currency");

            if (razorpayOrderId == null || razorpayOrderId.isBlank()
                    || returnedAmount != amountInPaise
                    || !"INR".equals(returnedCurrency)) {
                throw new BusinessException(
                        "Razorpay returned an invalid order response");
            }

            order.setRazorpayOrderId(razorpayOrderId);
            orderRepository.save(order);

            return new PaymentResponseDTO(
                    orderId, razorpayOrderId, razorpayProperties.getKeyId(),
                    returnedAmount, returnedCurrency);

        } catch (RazorpayException e) {
            throw new BusinessException("Unable to create Razorpay order");
        }
    }

    private int toPaise(BigDecimal amount) {
        if (amount == null || amount.signum() <= 0) {
            throw new BusinessException("Invalid order amount");
        }

        try {
            return amount.setScale(2, java.math.RoundingMode.UNNECESSARY)
                    .movePointRight(2)
                    .intValueExact();
        } catch (ArithmeticException e) {
            throw new BusinessException("Invalid order amount precision");
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
            if (payload == null || payload.isBlank()
                    || signature == null || signature.isBlank()) {
                throw new BusinessException("Missing webhook payload or signature");
            }

            boolean valid = Utils.verifyWebhookSignature(
                    payload, signature, razorpayProperties.getWebhookSecret());

            if (!valid) {
                throw new BusinessException("Invalid Razorpay webhook signature");
            }

            JSONObject webhook = new JSONObject(payload);
            String event = webhook.optString("event", "");

            if (!"payment.captured".equals(event)
                    && !"order.paid".equals(event)) {
                return; // Valid but unsupported event
            }

            JSONObject payment = webhook.getJSONObject("payload")
                    .getJSONObject("payment")
                    .getJSONObject("entity");

            String razorpayOrderId = payment.optString("order_id", "");
            String razorpayPaymentId = payment.optString("id", "");
            String paymentStatus = payment.optString("status", "");
            String currency = payment.optString("currency", "");
            int paidAmountInPaise = payment.getInt("amount");

            if (razorpayOrderId.isBlank() || razorpayPaymentId.isBlank()) {
                throw new BusinessException("Webhook is missing payment identifiers");
            }

            if (!"captured".equals(paymentStatus)) {
                throw new BusinessException("Razorpay payment is not captured");
            }

            if (!"INR".equals(currency)) {
                throw new BusinessException("Unsupported payment currency");
            }

            OrderEntity order = orderRepository
                    .findByRazorpayOrderIdForUpdate(razorpayOrderId)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Order not found for Razorpay order ID"));

            if (order.getPaymentMethod() != PaymentMethod.ONLINE) {
                throw new BusinessException("Order is not an online payment order");
            }

            int expectedAmountInPaise = toPaise(order.getTotalAmount());

            if (paidAmountInPaise != expectedAmountInPaise) {
                throw new BusinessException("Webhook amount does not match order amount");
            }

            if (order.getRazorpayPaymentId() != null
                    && !order.getRazorpayPaymentId().equals(razorpayPaymentId)) {
                throw new BusinessException(
                        "Conflicting Razorpay payment ID for this order");
            }

            if (order.getPaymentStatus() == PaymentStatus.PAID) {
                // Duplicate notification for the same payment: no second deduction.
                if (razorpayPaymentId.equals(order.getRazorpayPaymentId())) {
                    return;
                }
                throw new BusinessException("Order is already paid with another payment");
            }

            if (order.getPaymentStatus() != PaymentStatus.PENDING
                    || order.getOrderStatus() != OrderStatus.PENDING_PAYMENT) {
                throw new BusinessException(
                        "Order is not in a payable state; reconciliation is required");
            }

            order.setRazorpayPaymentId(razorpayPaymentId);
            orderRepository.save(order);

            // Must confirm payment and deduct stock atomically and idempotently.
            orderService.confirmOrder(order.getId());

        } catch (BusinessException | ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            // Let webhook processing fail so the failure can be investigated/retried.
            throw new RuntimeException("Razorpay webhook processing failed", e);
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