import api from "./api";

export const imageService = {

    /*
     * Uploads an image to the requested S3 folder.
     *
     * Examples:
     *
     * uploadImage(file, "products")
     * uploadImage(file, "sweet-boxes")
     * uploadImage(file, "carousel")
     * uploadImage(file, "gallery")
     */
    uploadImage: async (
        file: File,
        folder: string
    ): Promise<string> => {

        /*
         * FormData is used because we are sending
         * an actual file instead of JSON.
         */
        const formData = new FormData();

        /*
         * The key "file" MUST match the backend:
         *
         * @RequestParam("file")
         */
        formData.append("file", file);

        /*
         * Send the folder as a query parameter.
         *
         * Example:
         *
         * POST /api/images/upload?folder=products
         */
        const response =
            await api.post<string>(
                `/api/images/upload?folder=${encodeURIComponent(folder)}`,
                formData
            );

        /*
         * Backend returns the public S3 image URL.
         */
        return response.data;
    }
};