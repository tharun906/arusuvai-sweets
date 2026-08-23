package com.arusuvai.sweetbox;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/sweet-boxes")
public class SweetBoxController {

    private final SweetBoxService sweetBoxService;

    public SweetBoxController(
            SweetBoxService sweetBoxService) {

        this.sweetBoxService = sweetBoxService;
    }

    @GetMapping
    public List<SweetBoxResponseDTO> getActiveSweetBoxes() {
        return sweetBoxService.getActiveSweetBoxes();
    }
}