package com.arusuvai.auth.dto.mapper;

import com.arusuvai.auth.dto.response.LoginResponse;
import com.arusuvai.customer.CustomerEntity;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

    public LoginResponse toLoginResponse(CustomerEntity customer) {

        return new LoginResponse(
                customer.getId(),
                customer.getName(),
                customer.getPhoneNumber(),
                customer.getEmail(),
                customer.getDoorNo(),
                customer.getAddressLine1(),
                customer.getAddressLine2(),
                customer.getLandmark(),
                customer.getCity(),
                customer.getState(),
                customer.getPincode(),
                customer.getLatitude(),
                customer.getLongitude(),
                customer.getRole()
        );
    }
}