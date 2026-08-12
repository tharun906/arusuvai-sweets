package com.arusuvai.exception;

public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }
}

//Use this when the request is valid,
// but the business rule doesn't allow the operation.
//  Insufficient stock
//  Invalid payment state
//  Cannot cancel delivered order
//  Product is inactive
//  Delivery not available for this pincode