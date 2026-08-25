package com.arusuvai.sweetbox;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SweetBoxItemResponseDTO {

    private Long productId;
    private String productName;
    private Integer quantity;
}