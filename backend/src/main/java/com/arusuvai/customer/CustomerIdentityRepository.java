package com.arusuvai.customer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerIdentityRepository
        extends JpaRepository<CustomerIdentityEntity, Long> {

    Optional<CustomerIdentityEntity> findByProviderAndProviderSubject(
            String provider,
            String providerSubject
    );
}