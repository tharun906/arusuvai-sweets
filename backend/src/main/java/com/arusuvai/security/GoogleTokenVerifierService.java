package com.arusuvai.security;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleTokenVerifierService {

    private final GoogleIdTokenVerifier verifier;

    public GoogleTokenVerifierService(
            @Value("${google.client-id}") String clientId
    ) {

        this.verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance()
        )
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    public GoogleIdToken.Payload verify(String idToken) {

        try {

            GoogleIdToken googleIdToken =
                    verifier.verify(idToken);

            if (googleIdToken == null) {
                throw new IllegalArgumentException(
                        "Invalid Google ID token"
                );
            }

            return googleIdToken.getPayload();

        } catch (Exception e) {

            throw new IllegalArgumentException(
                    "Google token verification failed",
                    e
            );
        }
    }
}