package com.arusuvai.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminSummaryController {

    private final AdminSummaryService adminSummaryService;

    @GetMapping("/summary")
    public ResponseEntity<AdminSummaryResponseDTO> getSummary() {
        return ResponseEntity.ok(adminSummaryService.getSummary());
    }
}