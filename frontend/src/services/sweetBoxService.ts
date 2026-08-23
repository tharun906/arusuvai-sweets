import api from "./api";
import type { SweetBox } from "../types/SweetBox";

export const sweetBoxService = {

    getActiveSweetBoxes: async (): Promise<SweetBox[]> => {

        const response = await api.get<SweetBox[]>(
            "/api/sweet-boxes"
        );

        return response.data;
    }
};