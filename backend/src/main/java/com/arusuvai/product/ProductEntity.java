package com.arusuvai.product;

import jakarta.persistence.*;
import com.arusuvai.category.CategoryEntity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Getter
@Setter
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price250g;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price500g;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price1kg;

    @Column(nullable = false)
    private BigDecimal currentStockKg;

    @Column(nullable = false)
    private BigDecimal lowStockAlertKg;

    @Column(nullable = false)
    private boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;
}
