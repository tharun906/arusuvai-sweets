package com.arusuvai.customer;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
        name = "customer_identity",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_provider_subject",
                        columnNames = {"provider", "provider_subject"}
                )
        }
)
@Getter
@Setter
public class CustomerIdentityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    private String provider;

    @Column(name = "provider_subject", nullable = false, length = 255)
    private String providerSubject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer;
}