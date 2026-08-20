package com.arusuvai.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");

        // No JWT → continue normally.
        // Public endpoints can continue.
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7).trim();

        if (jwt.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        try {

            Claims claims =
                    jwtService.extractAllClaims(jwt);

            /*
             * GOOGLE USER
             *
             * This token represents a Google-authenticated
             * user whose Arusuvai customer profile is not
             * completed yet.
             */
            String provider =
                    claims.get("provider", String.class);

            if ("GOOGLE".equals(provider)) {

                String googleSubject =
                        claims.getSubject();

                if (googleSubject == null ||
                        googleSubject.isBlank()) {

                    throw new IllegalArgumentException(
                            "Google subject missing"
                    );
                }

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                googleSubject,
                                null,
                                List.of()
                        );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);

                filterChain.doFilter(request, response);
                return;
            }

            /*
             * NORMAL ARUSUVAI CUSTOMER / ADMIN
             */
            String customerId =
                    claims.getSubject();

            String role =
                    claims.get("role", String.class);

            if (customerId == null ||
                    customerId.isBlank()) {

                throw new IllegalArgumentException(
                        "Customer ID missing"
                );
            }

            if (role == null ||
                    role.isBlank()) {

                throw new IllegalArgumentException(
                        "Role missing"
                );
            }

            /*
             * Validate that customerId is actually a number.
             * Our normal JWT subject contains the customer ID.
             */
            Long.parseLong(customerId);

            /*
             * Only roles supported by our application
             * are allowed.
             */
            if (!role.equals("CUSTOMER") &&
                    !role.equals("ADMIN")) {

                throw new IllegalArgumentException(
                        "Invalid role"
                );
            }

            SimpleGrantedAuthority authority =
                    new SimpleGrantedAuthority(
                            "ROLE_" + role
                    );

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            customerId,
                            null,
                            List.of(authority)
                    );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);

        } catch (Exception e) {

            // Never authenticate an invalid JWT.
            SecurityContextHolder
                    .clearContext();

            System.out.println(
                    "Invalid JWT: " + e.getMessage()
            );
        }

        filterChain.doFilter(request, response);
    }
}