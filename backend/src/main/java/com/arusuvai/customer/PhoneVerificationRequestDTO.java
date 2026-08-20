package com.arusuvai.customer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhoneVerificationRequestDTO {

    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$")
    private String phoneNumber;
}