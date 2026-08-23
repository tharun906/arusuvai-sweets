package com.arusuvai.sweetbox;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

//admin
@Getter
@Setter
public class SweetBoxRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String totalWeight;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal price;

    private String imageUrl;

    @NotNull
    private Boolean active;

    @NotEmpty
    @Valid
    private List<SweetBoxItemRequestDTO> items;
}