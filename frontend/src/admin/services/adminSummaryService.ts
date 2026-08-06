import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import api from "../../services/api";
import type { AdminSummary } from "../types/AdminSummary";

export const getAdminSummary = async (): Promise<AdminSummary> => {

    const response = await api.get<AdminSummary>(
        API_ENDPOINTS.ADMIN_SUMMARY
    );

    return response.data;
};