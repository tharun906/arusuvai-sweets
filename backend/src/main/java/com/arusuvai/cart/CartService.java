package com.arusuvai.cart;

import java.util.List;

public interface CartService {
    CartResponseDTO addToCart(CartRequestDTO request);

    List<CartResponseDTO> getAllCartItems();

    CartResponseDTO updateCart(Long id, CartRequestDTO request);

    void removeFromCart(Long id);
}
