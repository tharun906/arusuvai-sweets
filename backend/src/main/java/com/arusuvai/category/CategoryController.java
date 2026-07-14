package com.arusuvai.category;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService service ;

    public CategoryController(CategoryService service){
        this.service=service;
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> gelAllCategory(){
        return ResponseEntity.ok(service.getAllCategory());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> changeStatus(@PathVariable Long id, @RequestBody CategoryStatusRequestDTO request){
        service.changeCategoryStatus(id, request.isActive());
        return ResponseEntity.noContent().build();
    }
}
