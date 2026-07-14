package com.arusuvai.category;

import java.util.List;

public interface CategoryService {

    List<CategoryResponseDTO> getAllCategory();
    void changeCategoryStatus(Long id, boolean active);
}

