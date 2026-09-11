package com.arusuvai.combopack;

import java.util.List;

public interface ComboPackService {

    ComboPackResponseDTO createComboPack(ComboPackRequestDTO request);

    List<ComboPackResponseDTO> getAllComboPacks();

    ComboPackResponseDTO getComboPackById(Long id);

    ComboPackResponseDTO updateComboPack(Long id, ComboPackRequestDTO request);

    void changeComboPackStatus(Long id, boolean active);
}