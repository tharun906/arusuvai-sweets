package com.arusuvai.category;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl  implements CategoryService{

    private final CategoryRepository repository;

    public CategoryServiceImpl(CategoryRepository repository){
        this.repository=repository;
    }

    @Override
    public List<CategoryResponseDTO> getAllCategory(){
        return repository.findAll()
                .stream()
                .map(category -> new CategoryResponseDTO(category.getId(), category.getName(), category.isActive()))
                .toList();

    }

    @Override
    public void changeCategoryStatus(Long id, boolean active) {
        CategoryEntity category = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setActive(active);
        repository.save(category);
    }
}


















