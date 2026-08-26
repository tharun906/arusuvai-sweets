package com.arusuvai.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.S3Object;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class S3Service {

    /*
     * S3Client is created by S3Config.
     *
     * Spring injects it here automatically.
     *
     * This object communicates with AWS S3.
     */
    private final S3Client s3Client;


    /*
     * Name of our S3 bucket.
     *
     * application.properties:
     *
     * aws.s3.bucket-name=arusuvai-sweets
     */
    @Value("${aws.s3.bucket-name}")
    private String bucketName;


    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }


    /*
     * ========================================
     * UPLOAD IMAGE
     * ========================================
     *
     * Uploads an image into the requested folder.
     *
     * Examples:
     *
     * uploadImage(file, "products")
     * uploadImage(file, "sweet-boxes")
     * uploadImage(file, "carousel")
     * uploadImage(file, "gallery")
     */
    public String uploadImage(
            MultipartFile file,
            String folder
    ) {

        /*
         * Generate a unique file name.
         *
         * Example:
         *
         * products/
         *   8f3c...-mysore-pak.jpg
         */
        String fileName =
                folder
                        + "/"
                        + UUID.randomUUID()
                        + "-"
                        + file.getOriginalFilename();


        /*
         * Tell S3:
         *
         * Which bucket?
         * Which object key?
         * What content type?
         */
        PutObjectRequest request =
                PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(fileName)
                        .contentType(file.getContentType())
                        .build();


        try {

            /*
             * Upload the actual image bytes to S3.
             */
            s3Client.putObject(
                    request,
                    RequestBody.fromBytes(
                            file.getBytes()
                    )
            );

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to read image file",
                    e
            );
        }


        /*
         * Return the public S3 URL.
         *
         * Example:
         *
         * https://arusuvai-sweets.s3.amazonaws.com/
         * products/uuid-mysore-pak.jpg
         */
        return "https://"
                + bucketName
                + ".s3.amazonaws.com/"
                + fileName;
    }


    public List<S3ImageResponse> listImages(
            String folder
    ) {

        /*
         * Ask S3 for all objects whose key starts
         * with the requested folder.
         *
         * Example:
         *
         * folder = "carousel"
         *
         * S3 searches:
         *
         * carousel/
         */
        ListObjectsV2Request request =
                ListObjectsV2Request.builder()
                        .bucket(bucketName)
                        .prefix(folder + "/")
                        .build();


        /*
         * Convert every S3 object into:
         *
         * {
         *     key: "...",
         *     url: "..."
         * }
         */
        return s3Client
                .listObjectsV2(request)
                .contents()
                .stream()
                .map(object -> {

                    String key = object.key();

                    String url =
                            "https://"
                                    + bucketName
                                    + ".s3.amazonaws.com/"
                                    + key;

                    return new S3ImageResponse(
                            key,
                            url
                    );
                })
                .toList();
    }


    /*
     * ========================================
     * DELETE IMAGE
     * ========================================
     *
     * Deletes an object from S3 using its key.
     *
     * Example:
     *
     * carousel/uuid-banner.jpg
     */
    public void deleteImage(
            String key
    ) {

        DeleteObjectRequest request =
                DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build();


        s3Client.deleteObject(request);
    }
}