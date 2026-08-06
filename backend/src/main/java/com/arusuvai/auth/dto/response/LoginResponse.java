package com.arusuvai.auth.dto.response;

import com.arusuvai.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponse {

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

    private Role role;

}