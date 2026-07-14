package com.arusuvai.product;


import com.arusuvai.category.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }


}
