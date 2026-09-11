
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import api from "../../services/api";
import type { ComboPack } from "../types/ComboPack";
import type { ComboPackRequest } from "../types/ComboPackRequest";

export const getComboPacks = async (): Promise<ComboPack[]> => {
    const response = await api.get<ComboPack[]>(
        API_ENDPOINTS.COMBO_PACK
    );

    return response.data;
};

export const getComboPackById = async (
    id: number
): Promise<ComboPack> => {
    const response = await api.get<ComboPack>(
        `${API_ENDPOINTS.COMBO_PACK}/${id}`
    );

    return response.data;
};

export const createComboPack = async (
    request: ComboPackRequest
): Promise<ComboPack> => {
    const response = await api.post<ComboPack>(
        API_ENDPOINTS.COMBO_PACK,
        request
    );

    return response.data;
};

export const updateComboPack = async (
    id: number,
    request: ComboPackRequest
): Promise<ComboPack> => {
    const response = await api.put<ComboPack>(
        `${API_ENDPOINTS.COMBO_PACK}/${id}`,
        request
    );

    return response.data;
};

export const changeComboPackStatus = async (
    id: number,
    active: boolean
): Promise<void> => {
    await api.patch(
        `${API_ENDPOINTS.COMBO_PACK}/${id}/status?active=${active}`
    );
};