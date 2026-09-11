package com.arusuvai.combopack;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/combo-pack")
public class ComboPackController {

    private final ComboPackService service;

    public ComboPackController(ComboPackService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ComboPackResponseDTO> createComboPack(
            @Valid @RequestBody ComboPackRequestDTO request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createComboPack(request));
    }

    @GetMapping
    public ResponseEntity<List<ComboPackResponseDTO>> getAllComboPacks() {
        return ResponseEntity.ok(service.getAllComboPacks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComboPackResponseDTO> getComboPackById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(service.getComboPackById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComboPackResponseDTO> updateComboPack(
            @PathVariable Long id,
            @Valid @RequestBody ComboPackRequestDTO request
    ) {
        return ResponseEntity.ok(
                service.updateComboPack(id, request)
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> changeStatus(
            @PathVariable Long id,
            @RequestParam boolean active
    ) {
        service.changeComboPackStatus(id, active);
        return ResponseEntity.noContent().build();
    }
}