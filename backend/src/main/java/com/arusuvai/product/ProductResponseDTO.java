package com.arusuvai.product;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class ProductResponseDTO {
    private Long id;

    private String name;

    private String description;

    private String imageUrl;

    private BigDecimal price250g;

    private BigDecimal price500g;

    private BigDecimal price1kg;

    private BigDecimal currentStockKg;

    private BigDecimal lowStockAlertKg;

    private boolean active;

    private Long categoryId;

    private String categoryName;
}
