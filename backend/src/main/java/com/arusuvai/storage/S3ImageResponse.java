package com.arusuvai.storage;

import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * Represents one image stored in S3.
 *
 * key:
 *     Actual S3 object key.
 *
 *     Example:
 *     carousel/abc123-banner.jpg
 *
 * url:
 *     Public URL used by React to display the image.
 */
@Getter
@AllArgsConstructor
public class S3ImageResponse {

    private String key;

    private String url;
}