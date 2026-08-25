import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import api from "../../services/api";
import type { SweetBox } from "../types/SweetBox";
import type { SweetBoxRequest } from "../types/SweetBoxRequest";


export const sweetBoxAdminService = {

    getAll: async (): Promise<SweetBox[]> => {

        const response = await api.get<SweetBox[]>(
            API_ENDPOINTS.ADMIN_SWEET_BOXES
        );

        return response.data;
    },

    create: async (
        request: SweetBoxRequest
    ): Promise<SweetBox> => {

        const response =
            await api.post<SweetBox>(
                API_ENDPOINTS.ADMIN_SWEET_BOXES,
                request
            );

        return response.data;
    },

    update: async (
        sweetBoxId: number,
        request: SweetBoxRequest
    ): Promise<SweetBox> => {

        const response =
            await api.put<SweetBox>(
                `${API_ENDPOINTS.ADMIN_SWEET_BOXES}/${sweetBoxId}`,
                request
            );

        return response.data;
    },

    delete: async (
        sweetBoxId: number
    ): Promise<void> => {

        await api.delete(
            `${API_ENDPOINTS.ADMIN_SWEET_BOXES}/${sweetBoxId}`
        );
    }
};