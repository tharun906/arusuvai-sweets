package com.arusuvai.storage;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final S3Service s3Service;


    public ImageController(
            S3Service s3Service
    ) {
        this.s3Service = s3Service;
    }


    /*
     * ========================================
     * UPLOAD IMAGE
     * ========================================
     *
     * Example:
     *
     * POST /api/images/upload?folder=products
     *
     * POST /api/images/upload?folder=sweet-boxes
     *
     * POST /api/images/upload?folder=carousel
     *
     * POST /api/images/upload?folder=gallery
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(

            @RequestParam("file")
            MultipartFile file,

            @RequestParam("folder")
            String folder

    ) {

        /*
         * Upload the image to the requested
         * S3 folder.
         */
        String imageUrl =
                s3Service.uploadImage(
                        file,
                        folder
                );


        /*
         * Return the S3 URL to React.
         */
        return ResponseEntity.ok(
                imageUrl
        );
    }


    @GetMapping("/{folder}")
    public ResponseEntity<List<S3ImageResponse>> listImages(

            @PathVariable
            String folder

    ) {

        /*
         * Get the images from the requested
         * S3 folder.
         *
         * Example:
         *
         * /api/images/carousel
         *
         * /api/images/gallery
         */
        List<S3ImageResponse> images =
                s3Service.listImages(
                        folder
                );


        return ResponseEntity.ok(
                images
        );
    }

    /*
     * ========================================
     * DELETE IMAGE
     * ========================================
     *
     * Example:
     *
     * DELETE /api/images
     *
     * Request body:
     *
     * carousel/uuid-banner.jpg
     */
    @DeleteMapping
    public ResponseEntity<Void> deleteImage(

            @RequestParam("key")
            String key

    ) {

        s3Service.deleteImage(key);

        return ResponseEntity.noContent()
                .build();
    }
}