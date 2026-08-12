package com.arusuvai.exception;

public class ResourceNotFoundException
        extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}

//ResourceNotFoundException
//↓
//The requested thing doesn't exist
//↓
//404