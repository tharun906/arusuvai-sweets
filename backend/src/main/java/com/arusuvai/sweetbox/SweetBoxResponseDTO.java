package com.arusuvai.sweetbox;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
public class SweetBoxResponseDTO {

    private Long id;

    private String name;

    private String totalWeight;

    private BigDecimal price;

    private String imageUrl;

    private boolean active;

    private List<SweetBoxItemResponseDTO> items;
}