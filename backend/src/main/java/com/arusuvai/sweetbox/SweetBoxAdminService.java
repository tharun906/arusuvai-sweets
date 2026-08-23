package com.arusuvai.sweetbox;

import java.util.List;

public interface SweetBoxAdminService {

    SweetBoxResponseDTO create(SweetBoxRequestDTO request);

    SweetBoxResponseDTO update(
            Long sweetBoxId,
            SweetBoxRequestDTO request
    );

    void delete(Long sweetBoxId);

    List<SweetBoxResponseDTO> getAll();
}