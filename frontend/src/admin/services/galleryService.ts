import api from "../../services/api";

export interface S3GalleryImage {
    /*
     * Actual S3 object key.
     *
     * Example:
     * gallery/abc123-sweet.jpg
     */
    key: string;

    /*
     * Public S3 URL used to display
     * the image in the browser.
     */
    url: string;
}

export const galleryService = {

    /*
     * Get all gallery images from S3.
     */
    getImages: async (): Promise<S3GalleryImage[]> => {

        const response =
            await api.get<S3GalleryImage[]>(
                "/api/images/gallery"
            );

        return response.data;
    },


    /*
     * Upload a new gallery image.
     *
     * Backend stores it inside:
     *
     * gallery/
     */
    uploadImage: async (
        file: File
    ): Promise<string> => {

        const formData = new FormData();

        formData.append(
            "file",
            file
        );

        const response =
            await api.post<string>(
                "/api/images/upload?folder=gallery",
                formData
            );

        return response.data;
    },


    /*
     * Delete a gallery image from S3.
     */
    deleteImage: async (
        key: string
    ): Promise<void> => {

        await api.delete(
            "/api/images",
            {
                params: {
                    key
                }
            }
        );
    }
};