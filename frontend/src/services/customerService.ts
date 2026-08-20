import api from "./api";
import type { AuthResponse } from "../auth/models/AuthResponse";
import type { RegisterRequest } from "../auth/models/RegisterRequest";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const completeCustomerProfile = async (
    request: RegisterRequest
): Promise<AuthResponse> => {

    const response = await api.post<AuthResponse>(
        API_ENDPOINTS.CUSTOMER_PROFILE,
        request
    );

    return response.data;
};