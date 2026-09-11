package com.arusuvai.combopack;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class ComboPackResponseDTO {

    private Long id;

    private String title;

    private String contents;

    private String weight;

    private BigDecimal price;

    private String imageUrl;

    private boolean active;
}