package com.arusuvai.auth.dto.service;

import com.arusuvai.auth.dto.OtpVerifyRequest;
import com.arusuvai.auth.dto.PhoneLoginRequest;
import com.arusuvai.auth.dto.RegisterCustomerRequest;
import com.arusuvai.auth.dto.mapper.AuthMapper;
import com.arusuvai.auth.dto.response.AuthResponse;
import com.arusuvai.auth.dto.response.LoginResponse;
import com.arusuvai.auth.dto.response.MessageResponse;
import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final CustomerRepository customerRepository;
    private final OtpStore otpStore;
    private final AuthMapper authMapper;


    public MessageResponse sendOtp(PhoneLoginRequest request) {
        String otp = generateOtp();
        otpStore.saveOtp(request.getPhoneNumber(), otp);
        System.out.println("OTP : " + otp);

        return new MessageResponse(  true,  "OTP sent successfully" );
    }

    public AuthResponse verifyOtp(OtpVerifyRequest request){
        OtpData otpData = otpStore.getOtp(request.getPhoneNumber());
        if(otpData == null){
            return new AuthResponse(false, "OTP Not Found",false,null );
        }
        if(LocalDateTime.now().isAfter(otpData.getExpiryTime())){
            otpStore.removeOtp(request.getPhoneNumber());
            return new AuthResponse(false,"OTP expired",false,null);
        }
        if(!otpData.getOtp().equals(request.getOtp())){
            return new AuthResponse(false,"Invalid OTP",false,null);
        }
        otpStore.removeOtp(request.getPhoneNumber());

        Optional<CustomerEntity> customer = customerRepository.findByPhoneNumber(request.getPhoneNumber());
        if (customer.isPresent()) {
            LoginResponse loginResponse = authMapper.toLoginResponse(customer.get());
            return new AuthResponse(
                    true,
                    "Login Successful",
                    true,
                    loginResponse
            );
        }
        return new AuthResponse(
                true,
                "Complete Register",
                false,
                null
        );
    }

    public AuthResponse registerCustomer(RegisterCustomerRequest request) {

        Optional<CustomerEntity> existingCustomer =
                customerRepository.findByPhoneNumber(request.getPhoneNumber());

        if (existingCustomer.isPresent()) {
            LoginResponse loginResponse = authMapper.toLoginResponse(existingCustomer.get());

            return new AuthResponse(
                    false,
                    "Customer already exists",
                    true,
                    loginResponse
            );
        }

        CustomerEntity customer = new CustomerEntity();

        customer.setName(request.getName());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setEmail(request.getEmail());
        customer.setAddress(request.getAddress());
        customer.setLatitude(request.getLatitude());
        customer.setLongitude(request.getLongitude());
        customer.setRole(Role.CUSTOMER);
        customer.setActive(true);

        customerRepository.save(customer);

        LoginResponse loginResponse =
                authMapper.toLoginResponse(customer);

        return new AuthResponse(
                true,
                "Registration Successful",
                true,
                loginResponse
        );

    }

    private String generateOtp(){
        Random random = new Random();
        return String.valueOf(100000+ random.nextInt(900000));
    }

}
