package com.arusuvai.payment;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

//    Store Key ID -> Store Key Secret ->Prepare HTTPS Connection -> Ready to call Razorpay APIs
    RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);


















}