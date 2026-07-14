package com.arusuvai.product;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductResponseDTO {
    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    private boolean active;

    private Integer displayOrder;

    private Long categoryId;

    private String categoryName;
}
