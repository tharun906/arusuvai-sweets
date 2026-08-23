package com.arusuvai.sweetbox;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SweetBoxItemRepository
        extends JpaRepository<SweetBoxItemEntity, Long> {
}