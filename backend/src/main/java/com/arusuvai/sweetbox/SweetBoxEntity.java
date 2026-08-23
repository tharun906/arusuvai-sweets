package com.arusuvai.sweetbox;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sweet_box")
@Getter
@Setter
public class SweetBoxEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 20)
    private String totalWeight;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private boolean active = true;

    @OneToMany(
            mappedBy = "sweetBox",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<SweetBoxItemEntity> items = new ArrayList<>();
}