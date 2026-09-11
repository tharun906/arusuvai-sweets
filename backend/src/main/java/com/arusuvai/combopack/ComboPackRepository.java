package com.arusuvai.combopack;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ComboPackRepository extends JpaRepository<ComboPackEntity, Long> {

    long count();
}