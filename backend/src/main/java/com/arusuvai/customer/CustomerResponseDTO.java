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

    private String address;
}
