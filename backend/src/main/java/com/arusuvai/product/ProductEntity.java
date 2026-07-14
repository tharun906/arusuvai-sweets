package com.arusuvai.product;

import jakarta.persistence.*;
import com.arusuvai.category.CategoryEntity;
import lombok.Getter;
import lombok.Setter;

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

    private String imageUrl;

    @Column(nullable = false)
    private boolean active = true;

    @Column(nullable = false)
    private Integer displayOrder;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;
}
