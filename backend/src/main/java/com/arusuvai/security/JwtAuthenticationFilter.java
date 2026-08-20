package com.arusuvai.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

import java.io.IOException;


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

        System.out.println("JWT FILTER CALLED");

        String authHeader =
                request.getHeader("Authorization");

        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);

        try {

            Claims claims =
                    jwtService.extractAllClaims(jwt);

            /*
             * Google authenticated user
             *
             * This token belongs to a Google user
             * who has not completed the Arusuvai
             * customer profile yet.
             */
            String provider =
                    claims.get("provider", String.class);

            if ("GOOGLE".equals(provider)) {

                String googleSubject =
                        claims.getSubject();

                System.out.println(
                        "Google Subject: " + googleSubject
                );

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
             * Normal Arusuvai customer
             */
            String customerId =
                    claims.getSubject();

            String role =
                    claims.get("role", String.class);

            System.out.println(
                    "Customer ID: " + customerId
            );

            System.out.println(
                    "Role: " + role
            );

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

            System.out.println("Invalid JWT");
        }

        filterChain.doFilter(request, response);
    }
}
