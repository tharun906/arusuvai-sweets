package com.arusuvai.auth.dto.service;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OtpStore {

    private final ConcurrentHashMap<String, OtpData> otpStorage
            =new ConcurrentHashMap<>();

    public void saveOtp(String phoneNumber, String otp){
        otpStorage.put(
                phoneNumber,
                new OtpData(otp, LocalDateTime.now().plusMinutes(5))
        );
    }

    public OtpData getOtp(String phoneNumber){
        return otpStorage.get(phoneNumber);
    }

    public void removeOtp(String phoneNumber){
        otpStorage.remove(phoneNumber);
    }
}
