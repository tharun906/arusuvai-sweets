package com.arusuvai.auth.dto;

import lombok.Data;

@Data
public class RegisterCustomerRequest {

    private String phoneNumber;

    private String name;

    private String email;

    private String doorNo;

    private String addressLine1;

    private String addressLine2;

    private String landmark;

    private String city;

    private String state;

    private String pincode;

    private Double latitude;

    private Double longitude;

}