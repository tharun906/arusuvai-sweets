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

        Optional<CustomerEntity> existingCustomer =
                customerRepository.findByPhoneNumber(request.getPhoneNumber());

        if (existingCustomer.isPresent()) {

            LoginResponse loginResponse =
                    authMapper.toLoginResponse(existingCustomer.get());

            String token = jwtService.generateToken(
                    existingCustomer.get().getId(),
                    existingCustomer.get().getRole().name()
            );

            return new AuthResponse(
                    false,
                    "Customer already exists",
                    true,
                    loginResponse,
                    token
            );
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

        LoginResponse loginResponse =
                authMapper.toLoginResponse(customer);

        String token = jwtService.generateToken(
                customer.getId(),
                customer.getRole().name()
        );

        return new AuthResponse(
                true,
                "Registration Successful",
                true,
                loginResponse,
                token
        );
    }

    public AuthResponse checkPhone(
            PhoneLoginRequest request,
            Authentication authentication
    ) {

        System.out.println("CHECK PHONE AUTH = " + authentication);
        System.out.println("CHECK PHONE NAME = " +
                (authentication != null ? authentication.getName() : "NULL"));
        System.out.println("CHECK PHONE AUTHORITIES = " +
                (authentication != null ? authentication.getAuthorities() : "NULL"));

        Optional<CustomerEntity> customer =
                customerRepository.findByPhoneNumber(request.getPhoneNumber());

        boolean googleAuthenticated =
                authentication != null
                        && authentication.isAuthenticated()
                        && authentication.getAuthorities().isEmpty()
                        && authentication.getName() != null;

        System.out.println("GOOGLE AUTHENTICATED = " + googleAuthenticated);

        if (googleAuthenticated) {

            String googleSubject = authentication.getName();

            Optional<CustomerIdentityEntity> googleIdentity =
                    customerIdentityRepository
                            .findByProviderAndProviderSubject(
                                    "GOOGLE",
                                    googleSubject
                            );

            if (googleIdentity.isPresent()
                    && googleIdentity.get().getCustomer() != null) {

                CustomerEntity googleCustomer =
                        googleIdentity.get().getCustomer();

                if (customer.isEmpty()) {
                    return new AuthResponse(
                            false,
                            "This phone number is not associated with your Google account.",
                            false,
                            null,
                            null,
                            null
                    );
                }

                CustomerEntity phoneCustomer = customer.get();

                if (!googleCustomer.getId().equals(phoneCustomer.getId())) {
                    return new AuthResponse(
                            false,
                            "This phone number is not associated with your Google account.",
                            false,
                            null,
                            null,
                            null
                    );
                }

                LoginResponse loginResponse =
                        authMapper.toLoginResponse(googleCustomer);

                String token = jwtService.generateToken(
                        googleCustomer.getId(),
                        googleCustomer.getRole().name()
                );

                return new AuthResponse(
                        true,
                        "Login Successful",
                        true,
                        loginResponse,
                        token,
                        jwtService.generateGoogleToken(googleSubject)
                );
            }

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

            return new AuthResponse(
                    false,
                    "This phone number is not associated with your Google account.",
                    false,
                    null,
                    null,
                    null
            );
        }

        if (customer.isPresent()) {

            LoginResponse loginResponse =
                    authMapper.toLoginResponse(customer.get());

            String token = jwtService.generateToken(
                    customer.get().getId(),
                    customer.get().getRole().name()
            );

            return new AuthResponse(
                    true,
                    "Login Successful",
                    true,
                    loginResponse,
                    token
            );
        }

        return new AuthResponse(
                true,
                "Complete Register",
                false,
                null,
                null
        );
    }

    public AuthResponse googleLogin(GoogleLoginRequest request) {

        GoogleIdToken.Payload payload =
                googleTokenVerifierService.verify(request.getCredential());

        String googleSubject = payload.getSubject();
        String email = payload.getEmail();

        Optional<CustomerIdentityEntity> existingIdentity =
                customerIdentityRepository
                        .findByProviderAndProviderSubject(
                                "GOOGLE",
                                googleSubject
                        );

        CustomerIdentityEntity identity;

        if (existingIdentity.isPresent()) {

            identity = existingIdentity.get();

        } else {

            identity = new CustomerIdentityEntity();
            identity.setProvider("GOOGLE");
            identity.setProviderSubject(googleSubject);

            customerIdentityRepository.save(identity);
        }

        // NEW GOOGLE CUSTOMER
        if (identity.getCustomer() == null) {

            String token =
                    jwtService.generateGoogleToken(googleSubject);

            return new AuthResponse(
                    true,
                    "Google login successful. Complete your profile before checkout.",
                    false,
                    null,
                    token,
                    token,
                    email
            );
        }

        // EXISTING GOOGLE CUSTOMER
        CustomerEntity customer = identity.getCustomer();

        if (!Boolean.TRUE.equals(customer.getActive())) {
            throw new BusinessException("Customer account is inactive");
        }

        LoginResponse loginResponse =
                authMapper.toLoginResponse(customer);

        String token = jwtService.generateToken(
                customer.getId(),
                customer.getRole().name()
        );

        String googleVerificationToken =
                jwtService.generateGoogleToken(googleSubject);

        return new AuthResponse(
                true,
                "Login Successful",
                true,
                loginResponse,
                token,
                googleVerificationToken
        );
    }
}