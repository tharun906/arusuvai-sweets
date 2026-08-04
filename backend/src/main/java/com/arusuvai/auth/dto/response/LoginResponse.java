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

    private String address;

    private Double latitude;

    private Double longitude;

    private Role role;

}