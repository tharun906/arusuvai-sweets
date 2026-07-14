package com.arusuvai.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestDTO {

    @NotBlank(message = "Product name is required")
    private String name;

    private String description;

    private String imageUrl;

    @NotNull(message = "Display Order is required")
    private Integer displayOrder;

    @NotNull(message = "Category is required")
    private Long categoryId;
}
