import api from "../../services/api";
import type { AuthResponse } from "../models/AuthResponse";
import type { LoginRequest } from "../models/LoginRequest";
import type { RegisterRequest } from "../models/RegisterRequest";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export const authService = {

    checkPhone: async (
        request: LoginRequest
    ): Promise<AuthResponse> => {

        const response = await api.post<AuthResponse>(
            API_ENDPOINTS.AUTH_CHECK_PHONE,
            request
        );

        return response.data;
    },

    register: async (
        request: RegisterRequest
    ): Promise<AuthResponse> => {

        const response = await api.post<AuthResponse>(
            API_ENDPOINTS.AUTH_REGISTER,
            request
        );

        return response.data;
    }

};