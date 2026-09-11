package com.arusuvai.combopack;

import com.arusuvai.exception.BusinessException;
import com.arusuvai.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComboPackServiceImpl implements ComboPackService {

    private final ComboPackRepository comboPackRepository;

    public ComboPackServiceImpl(ComboPackRepository comboPackRepository) {
        this.comboPackRepository = comboPackRepository;
    }

    @Override
    public ComboPackResponseDTO createComboPack(ComboPackRequestDTO request) {

        if (comboPackRepository.count() > 0) {
            throw new BusinessException("Combo Pack already exists");
        }

        ComboPackEntity comboPack = new ComboPackEntity();

        comboPack.setTitle(request.getTitle());
        comboPack.setContents(request.getContents());
        comboPack.setWeight(request.getWeight());
        comboPack.setPrice(request.getPrice());
        comboPack.setImageUrl(request.getImageUrl());

        ComboPackEntity saved = comboPackRepository.save(comboPack);

        return mapToResponse(saved);
    }

    @Override
    public List<ComboPackResponseDTO> getAllComboPacks() {

        return comboPackRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ComboPackResponseDTO getComboPackById(Long id) {

        ComboPackEntity comboPack = comboPackRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Combo Pack not found"));

        return mapToResponse(comboPack);
    }

    @Override
    public ComboPackResponseDTO updateComboPack(
            Long id,
            ComboPackRequestDTO request
    ) {

        ComboPackEntity comboPack = comboPackRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Combo Pack not found"));

        comboPack.setTitle(request.getTitle());
        comboPack.setContents(request.getContents());
        comboPack.setWeight(request.getWeight());
        comboPack.setPrice(request.getPrice());
        comboPack.setImageUrl(request.getImageUrl());

        ComboPackEntity updated = comboPackRepository.save(comboPack);

        return mapToResponse(updated);
    }

    @Override
    public void changeComboPackStatus(Long id, boolean active) {

        ComboPackEntity comboPack = comboPackRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Combo Pack not found"));

        comboPack.setActive(active);

        comboPackRepository.save(comboPack);
    }

    private ComboPackResponseDTO mapToResponse(
            ComboPackEntity comboPack
    ) {

        return new ComboPackResponseDTO(
                comboPack.getId(),
                comboPack.getTitle(),
                comboPack.getContents(),
                comboPack.getWeight(),
                comboPack.getPrice(),
                comboPack.getImageUrl(),
                comboPack.isActive()
        );
    }
}