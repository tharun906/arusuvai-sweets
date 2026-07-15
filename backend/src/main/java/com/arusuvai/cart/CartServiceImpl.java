package com.arusuvai.cart;

import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository){
        this.cartRepository=cartRepository;
    }
}
