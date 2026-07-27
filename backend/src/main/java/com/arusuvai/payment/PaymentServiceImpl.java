package com.arusuvai.payment;

import com.arusuvai.config.RazorpayProperties;
import com.arusuvai.order.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
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
            return orderService.confirmOrder(request.getOrderId());

        } catch (RazorpayException e) {
            throw new RuntimeException("Payment Verification Failed", e);
        }
    }
}