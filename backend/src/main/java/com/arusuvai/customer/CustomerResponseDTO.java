package com.arusuvai.customer;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomerResponseDTO {

    private Long id;

    private String name;

    private String phoneNumber;

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