package com.arusuvai.auth.dto.service;

import com.arusuvai.auth.dto.GoogleLoginRequest;
import com.arusuvai.auth.dto.PhoneLoginRequest;
import com.arusuvai.auth.dto.RegisterCustomerRequest;
import com.arusuvai.auth.dto.mapper.AuthMapper;
import com.arusuvai.auth.dto.response.AuthResponse;
import com.arusuvai.auth.dto.response.LoginResponse;
import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerIdentityEntity;
import com.arusuvai.customer.CustomerIdentityRepository;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.enums.Role;
import com.arusuvai.exception.BusinessException;
import com.arusuvai.security.GoogleTokenVerifierService;
import com.arusuvai.security.JwtService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final CustomerRepository customerRepository;
    private final AuthMapper authMapper;
    private final JwtService jwtService;
    private final GoogleTokenVerifierService googleTokenVerifierService;
    private final CustomerIdentityRepository customerIdentityRepository;

    public AuthResponse registerCustomer(RegisterCustomerRequest request) {
        Optional<CustomerEntity> existingCustomer = customerRepository.findByPhoneNumber(request.getPhoneNumber());

        if (existingCustomer.isPresent()) {
            LoginResponse loginResponse = authMapper.toLoginResponse(existingCustomer.get());
            String token = jwtService.generateToken(existingCustomer.get().getId(), existingCustomer.get().getRole().name());

            return new AuthResponse(false, "Customer already exists", true, loginResponse, token);
        }

        CustomerEntity customer = new CustomerEntity();
        customer.setName(request.getName());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setEmail(request.getEmail());
        customer.setDoorNo(request.getDoorNo());
        customer.setAddressLine1(request.getAddressLine1());
        customer.setAddressLine2(request.getAddressLine2());
        customer.setLandmark(request.getLandmark());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPincode(request.getPincode());
        customer.setLatitude(request.getLatitude());
        customer.setLongitude(request.getLongitude());
        customer.setRole(Role.CUSTOMER);
        customer.setActive(true);

        customerRepository.save(customer);

        LoginResponse loginResponse = authMapper.toLoginResponse(customer);
        String token = jwtService.generateToken(customer.getId(), customer.getRole().name());

        return new AuthResponse(true, "Registration Successful", true, loginResponse, token);
    }

    public AuthResponse checkPhone(PhoneLoginRequest request, Authentication authentication) {
        System.out.println("CHECK PHONE AUTH = " + authentication);
        System.out.println("CHECK PHONE NAME = " + (authentication != null ? authentication.getName() : "NULL"));
        System.out.println("CHECK PHONE AUTHORITIES = " + (authentication != null ? authentication.getAuthorities() : "NULL"));

        Optional<CustomerEntity> customer = customerRepository.findByPhoneNumber(request.getPhoneNumber());

        boolean googleAuthenticated = authentication != null
                && authentication.isAuthenticated()
                && authentication.getAuthorities().isEmpty()
                && authentication.getName() != null;

        System.out.println("GOOGLE AUTHENTICATED = " + googleAuthenticated);

        /*
         * ========================================
         * GOOGLE AUTHENTICATED USER
         * ========================================
         */
        if (googleAuthenticated) {
            String googleSubject = authentication.getName();

            Optional<CustomerIdentityEntity> googleIdentity =
                    customerIdentityRepository.findByProviderAndProviderSubject("GOOGLE", googleSubject);

            /*
             * No customer exists with this phone.
             *
             * This is a new Google customer.
             */
            if (customer.isEmpty()) {
                return new AuthResponse(
                        true,
                        "Complete Register",
                        false,
                        null,
                        null,
                        jwtService.generateGoogleToken(googleSubject)
                );
            }

            CustomerEntity phoneCustomer = customer.get();

            /*
             * Phone belongs to an existing customer.
             *
             * Verify that this Google identity is
             * actually linked to that customer.
             */
            if (googleIdentity.isEmpty()
                    || googleIdentity.get().getCustomer() == null
                    || !googleIdentity.get().getCustomer().getId().equals(phoneCustomer.getId())) {

                return new AuthResponse(
                        false,
                        "This phone number is not associated with your Google account.",
                        false,
                        null,
                        null,
                        null
                );
            }

            /*
             * Correct Google account + correct phone.
             */
            LoginResponse loginResponse = authMapper.toLoginResponse(phoneCustomer);
            String token = jwtService.generateToken(phoneCustomer.getId(), phoneCustomer.getRole().name());

            return new AuthResponse(
                    true,
                    "Login Successful",
                    true,
                    loginResponse,
                    token,
                    jwtService.generateGoogleToken(googleSubject)
            );
        }

        /*
         * ========================================
         * NORMAL PHONE LOGIN
         * ========================================
         */
        if (customer.isPresent()) {
            LoginResponse loginResponse = authMapper.toLoginResponse(customer.get());
            String token = jwtService.generateToken(customer.get().getId(), customer.get().getRole().name());

            return new AuthResponse(true, "Login Successful", true, loginResponse, token);
        }

        return new AuthResponse(true, "Complete Register", false, null, null);
    }

    public AuthResponse googleLogin(GoogleLoginRequest request) {
        GoogleIdToken.Payload payload = googleTokenVerifierService.verify(request.getCredential());
        String googleSubject = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        Optional<CustomerIdentityEntity> existingIdentity =
                customerIdentityRepository.findByProviderAndProviderSubject("GOOGLE", googleSubject);

        CustomerIdentityEntity identity;

        if (existingIdentity.isPresent()) {
            identity = existingIdentity.get();
        } else {
            identity = new CustomerIdentityEntity();
            identity.setProvider("GOOGLE");
            identity.setProviderSubject(googleSubject);
            customerIdentityRepository.save(identity);
        }

        // Google authentication succeeded,
        // but the Arusuvai customer profile may not exist yet.
        if (identity.getCustomer() == null) {
            String token = jwtService.generateGoogleToken(googleSubject);

            return new AuthResponse(
                    true,
                    "Google login successful. Complete your profile before checkout.",
                    false,
                    null,
                    token,
                    token
            );
        }

        CustomerEntity customer = identity.getCustomer();

        if (!Boolean.TRUE.equals(customer.getActive())) {
            throw new BusinessException("Customer account is inactive");
        }

        LoginResponse loginResponse = authMapper.toLoginResponse(customer);
        String token = jwtService.generateToken(customer.getId(), customer.getRole().name());
        String googleVerificationToken = jwtService.generateGoogleToken(googleSubject);

        return new AuthResponse(
                true,
                "Login Successful",
                true,
                loginResponse,
                token,
                googleVerificationToken
        );
    }

    //OLD OTP FEATURE
//    private String generateOtp(){
//        Random random = new Random();
//        return String.valueOf(100000+ random.nextInt(900000));
//    }
//public MessageResponse sendOtp(PhoneLoginRequest request) {
//    String otp = generateOtp();
//    otpStore.saveOtp(request.getPhoneNumber(), otp);
//    System.out.println("OTP : " + otp);
//
//    return new MessageResponse(  true,  "OTP sent successfully" );
//}
//
//    public AuthResponse verifyOtp(OtpVerifyRequest request){
//        OtpData otpData = otpStore.getOtp(request.getPhoneNumber());
//        if(otpData == null){
//            return new AuthResponse(false, "OTP Not Found",false,null );
//        }
//        if(LocalDateTime.now().isAfter(otpData.getExpiryTime())){
//            otpStore.removeOtp(request.getPhoneNumber());
//            return new AuthResponse(false,"OTP expired",false,null);
//        }
//        if(!otpData.getOtp().equals(request.getOtp())){
//            return new AuthResponse(false,"Invalid OTP",false,null);
//        }
//        otpStore.removeOtp(request.getPhoneNumber());
//
//        Optional<CustomerEntity> customer = customerRepository.findByPhoneNumber(request.getPhoneNumber());
//        if (customer.isPresent()) {
//            LoginResponse loginResponse = authMapper.toLoginResponse(customer.get());
//            return new AuthResponse(
//                    true,
//                    "Login Successful",
//                    true,
//                    loginResponse
//            );
//        }
//        return new AuthResponse(
//                true,
//                "Complete Register",
//                false,
//                null
//        );
//    }
}