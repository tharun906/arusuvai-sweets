package com.arusuvai.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    /*
     * Reads the AWS region from application.properties.
     *
     * Example:
     * aws.region=ap-south-1
     *
     * This tells our application which AWS region
     * contains our S3 bucket.
     */
    @Value("${aws.region}")
    private String region;


    /*
     * Creates an S3Client object.
     *
     * S3Client is the AWS SDK object that our
     * application will use to communicate with S3.
     *
     * Spring creates this object once and makes it
     * available to other classes through dependency injection.
     */
    @Bean
    public S3Client s3Client() {

        return S3Client.builder()

                // Tell AWS which region our S3 bucket is in.
                .region(Region.of(region))

                // Build the S3 client.
                .build();
    }
}