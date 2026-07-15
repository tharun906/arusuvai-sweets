package com.arusuvai.product;


import com.arusuvai.category.CategoryEntity;
import com.arusuvai.category.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO request){
        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()-> new RuntimeException("Category Not found"));

        if (!category.isActive()) {
            throw new RuntimeException("Category is inactive");
        }

        ProductEntity product = new ProductEntity();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(category);
        product.setPrice250g(request.getPrice250g());
        product.setPrice500g(request.getPrice500g());
        product.setPrice1kg(request.getPrice1kg());
        product.setCurrentStockKg(request.getCurrentStockKg());
        product.setLowStockAlertKg(request.getLowStockAlertKg());

        ProductEntity saved = productRepository.save(product);
        return mapToResponse(saved);

    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ProductResponseDTO getProductById(Long id) {

        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return mapToResponse(product);
    }

    @Override
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO request) {

        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!category.isActive()) {
            throw new RuntimeException("Category is inactive");
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setPrice250g(request.getPrice250g());
        product.setPrice500g(request.getPrice500g());
        product.setPrice1kg(request.getPrice1kg());

        product.setCurrentStockKg(request.getCurrentStockKg());
        product.setLowStockAlertKg(request.getLowStockAlertKg());
        product.setCategory(category);
        ProductEntity updated = productRepository.save(product);
        return mapToResponse(updated);
    }

    @Override
    public void changeProductStatus(Long id, boolean active) {

        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setActive(active);
        productRepository.save(product);
    }

    private ProductResponseDTO mapToResponse(ProductEntity product){
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImageUrl(),
                product.getPrice250g(),
                product.getPrice500g(),
                product.getPrice1kg(),
                product.getCurrentStockKg(),
                product.getLowStockAlertKg(),
                product.isActive(),
                product.getCategory().getId(),
                product.getCategory().getName()
        );
    }
}
