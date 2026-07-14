package com.arusuvai.category;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryResponseDTO {

    private Long id;
    private String name;
    private boolean active;
}
