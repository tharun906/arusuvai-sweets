package com.arusuvai.sweetbox;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/sweet-boxes")
public class SweetBoxAdminController {

    private final SweetBoxAdminService sweetBoxAdminService;

    public SweetBoxAdminController(
            SweetBoxAdminService sweetBoxAdminService) {

        this.sweetBoxAdminService = sweetBoxAdminService;
    }

    @GetMapping
    public ResponseEntity<List<SweetBoxResponseDTO>> getAll() {

        return ResponseEntity.ok(
                sweetBoxAdminService.getAll()
        );
    }

    @PostMapping
    public ResponseEntity<SweetBoxResponseDTO> create(
            @Valid @RequestBody SweetBoxRequestDTO request) {

        return ResponseEntity.ok(
                sweetBoxAdminService.create(request)
        );
    }

    @PutMapping("/{sweetBoxId}")
    public ResponseEntity<SweetBoxResponseDTO> update(
            @PathVariable Long sweetBoxId,
            @Valid @RequestBody SweetBoxRequestDTO request) {

        return ResponseEntity.ok(
                sweetBoxAdminService.update(
                        sweetBoxId,
                        request
                )
        );
    }

    @DeleteMapping("/{sweetBoxId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long sweetBoxId) {

        sweetBoxAdminService.delete(sweetBoxId);

        return ResponseEntity.noContent().build();
    }
}