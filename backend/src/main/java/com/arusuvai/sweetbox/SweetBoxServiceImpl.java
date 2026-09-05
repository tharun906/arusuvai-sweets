package com.arusuvai.sweetbox;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SweetBoxServiceImpl implements SweetBoxService {

    private final SweetBoxRepository sweetBoxRepository;

    public SweetBoxServiceImpl(
            SweetBoxRepository sweetBoxRepository) {

        this.sweetBoxRepository = sweetBoxRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SweetBoxResponseDTO> getSweetBoxes() {

        return sweetBoxRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private SweetBoxResponseDTO mapToResponse(
            SweetBoxEntity sweetBox) {

        List<SweetBoxItemResponseDTO> items =
                sweetBox.getItems()
                        .stream()
                        .map(item ->
                                new SweetBoxItemResponseDTO(
                                        item.getProduct().getId(),
                                        item.getProduct().getName(),
                                        item.getQuantity()
                                )
                        )
                        .toList();

        return new SweetBoxResponseDTO(
                sweetBox.getId(),
                sweetBox.getName(),
                sweetBox.getTotalWeight(),
                sweetBox.getPrice(),
                sweetBox.getImageUrl(),
                sweetBox.isActive(),
                items
        );
    }
}