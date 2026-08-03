package com.arusuvai.auth.dto;

import lombok.Data;

@Data
public class RegisterCustomerRequest {

    private String phoneNumber;

    private String name;

    private String email;

    private String address;

    private Double latitude;

    private Double longitude;

}