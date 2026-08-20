package com.arusuvai.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> {})

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

// =========================
// CORS PREFLIGHT
// =========================

                                .requestMatchers(
                                        HttpMethod.OPTIONS,
                                        "/**"
                                ).permitAll()

// =========================
// AUTHENTICATION
// =========================

                                .requestMatchers(
                                        "/api/auth/**"
                                ).permitAll()

// =========================
// PUBLIC PRODUCT READ APIs
// =========================

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/products/**"
                                ).permitAll()

// =========================
// ADMIN PRODUCT APIs
// =========================

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/products/**"
                                ).hasRole("ADMIN")

                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/products/**"
                                ).hasRole("ADMIN")

                                .requestMatchers(
                                        HttpMethod.PATCH,
                                        "/api/products/**"
                                ).hasRole("ADMIN")

// =========================
// PUBLIC CATEGORY READ API
// =========================

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/categories/**"
                                ).permitAll()

// =========================
// ADMIN CATEGORY API
// =========================

                                .requestMatchers(
                                        HttpMethod.PATCH,
                                        "/api/categories/**"
                                ).hasRole("ADMIN")

// =========================
// GOOGLE PROFILE COMPLETION
// =========================

// New Google customer
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/customer/profile"
                                ).authenticated()

// =========================
// EXISTING CUSTOMER PROFILE
// =========================

// Verify phone against authenticated Google identity
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/customer/verify-phone"
                                ).authenticated()

// Update existing customer's profile/address
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/customer/profile"
                                ).authenticated()

// =========================
// CHECKOUT
// =========================

// Delivery availability is public
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/checkout/check-delivery"
                                ).permitAll()

// Checkout summary requires login
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/checkout/summary"
                                ).authenticated()

// =========================
// ADMIN APIs
// =========================

                                .requestMatchers(
                                        "/api/admin/**"
                                ).hasRole("ADMIN")

// =========================
// ADMIN CUSTOMER MANAGEMENT
// =========================

                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/customer"
                                ).hasRole("ADMIN")

                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/customer"
                                ).hasRole("ADMIN")

// =========================
// EVERYTHING ELSE
// =========================

                                .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}