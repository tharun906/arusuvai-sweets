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
//    Spring calls this method when an HTTP request comes into the backend.
//doFilterInternal() is where our filter gets each incoming HTTP requestand
//    can inspect it before allowing it to continue through the Spring Security filter chain.

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }


    // This method intercepts every incoming web request exactly once to check its security token
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,     // Holds the incoming data from the frontend (headers, url, etc.)
            HttpServletResponse response,   // Holds the outgoing data going back to the frontend
            FilterChain filterChain         // List of other security guards (filters) waiting in line
    ) throws ServletException, IOException { // Throws standard web handling errors if something breaks

        System.out.println("JWT FILTER CALLED");

        // 1. Look inside the request headers for a key named "Authorization"
        String authHeader =
                request.getHeader("Authorization");

        // 2. Check if the security header is completely missing
        if (authHeader == null ||
                // 3. Or check if the header fails to start with the required word "Bearer "
                !authHeader.startsWith("Bearer ")) {

            // 4. Pass this unauthenticated request forward to the next filter in line
            filterChain.doFilter(request, response);
            // 5. Exit this method immediately so no more code runs below
            return;
        }

        // 6. Cut off the first 7 characters ("Bearer ") to isolate only the raw encrypted JWT text
        String jwt = authHeader.substring(7);

        // 7. Start a safety block to catch errors if the token is fake, altered, or expired
        try {

            Claims claims =
                    jwtService.extractAllClaims(jwt);

            String customerId =
                    claims.getSubject();

            String role =
                    claims.get("role", String.class);

            System.out.println("Customer ID: " + customerId);
            System.out.println("Role: " + role);

            SimpleGrantedAuthority authority =
                    new SimpleGrantedAuthority("ROLE_" + role);

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

        // 15. Finally, pass the request along to the rest of your application (like your Controllers)
        filterChain.doFilter(request, response);
    }


}
