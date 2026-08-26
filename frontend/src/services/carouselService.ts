import api from "./api";


export interface S3ImageResponse {
    /*
     * Actual S3 object key.
     *
     * Example:
     * carousel/abc123-banner.jpg
     *
     * We use this when deleting the image.
     */
    key: string;

    /*
     * Public S3 URL used to display the image.
     */
    url: string;
}

export const carouselService = {

    /*
     * Get all carousel images from S3.
     *
     * No database is involved.
     */
    getImages: async (): Promise<S3ImageResponse[]> => {

        const response =
            await api.get<S3ImageResponse[]>(
                "/api/images/carousel"
            );

        return response.data;
    },


    /*
     * Upload a new carousel image to S3.
     *
     * The backend stores it inside:
     *
     * carousel/
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
                "/api/images/upload?folder=carousel",
                formData
            );

        return response.data;
    },


    /*
     * Delete a carousel image from S3.
     *
     * We send the S3 object key rather than
     * the complete URL.
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