package com.arusuvai.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
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
     * Products:
     *
     * uploadImage(file, "products", "Premium Mysore Pak")
     *
     * Result:
     *
     * products/premium-mysore-pak.jpg
     *
     *
     * Other folders:
     *
     * uploadImage(file, "carousel", null)
     *
     * uploadImage(file, "gallery", null)
     *
     * uploadImage(file, "sweet-boxes", null)
     *
     * These continue using UUID-based filenames.
     */
    public String uploadImage(
            MultipartFile file,
            String folder,
            String fileName
    ) {

        /*
         * Get the original file extension.
         *
         * Example:
         *
         * image.jpg → .jpg
         * image.png → .png
         * image.webp → .webp
         */
        String extension = "";

        if (file.getOriginalFilename() != null &&
                file.getOriginalFilename().contains(".")) {

            extension = file.getOriginalFilename()
                    .substring(
                            file.getOriginalFilename().lastIndexOf(".")
                    );
        }


        /*
         * Generate the final S3 object key.
         *
         * Products with a fileName:
         *
         * products/premium-mysore-pak.jpg
         *
         * Other folders without a fileName:
         *
         * carousel/UUID-banner.jpg
         */
        String finalFileName;

        if (fileName != null && !fileName.isBlank()) {

            String safeFileName = sanitizeFileName(fileName);

            finalFileName =
                    folder
                            + "/"
                            + safeFileName
                            + extension;

        } else {

            finalFileName =
                    folder
                            + "/"
                            + UUID.randomUUID()
                            + "-"
                            + file.getOriginalFilename();
        }


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
                        .key(finalFileName)
                        .contentType(file.getContentType())
                        .build();


        try {

            /*
             * Upload the actual image bytes to S3.
             *
             * If the same key already exists,
             * S3 replaces the existing object.
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
         */
        return "https://"
                + bucketName
                + ".s3.amazonaws.com/"
                + finalFileName;
    }

    private String sanitizeFileName(String fileName) {

        return fileName
                .trim()
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
    }


    public List<S3ImageResponse> listImages(
            String folder
    ) {

        /*
         * Ask S3 for all objects whose key starts
         * with the requested folder.
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
     * Used by carousel/gallery etc.
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