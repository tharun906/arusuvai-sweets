package com.arusuvai.product;

import java.util.List;

public interface ProductService {
    ProductResponseDTO createProduct(ProductRequestDTO request);
    List<ProductResponseDTO> getAllProducts();
    ProductResponseDTO getProductById(Long id);
    ProductResponseDTO updateProduct(Long id, ProductRequestDTO request);
    void changeProductStatus(Long id, boolean active);
}
