import api from "../../services/api";

import type { AuthResponse } from "../models/AuthResponse";
import type { LoginRequest } from "../models/LoginRequest";
import type { RegisterRequest } from "../models/RegisterRequest";
import type { GoogleLoginRequest } from "../models/GoogleLoginRequest";

import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export const authService = {

    checkPhone: async (
        request: LoginRequest
    ): Promise<AuthResponse> => {

        const googleVerificationToken =
            localStorage.getItem(
                "googleVerificationToken"
            );

        const response =
            await api.post<AuthResponse>(
                API_ENDPOINTS.AUTH_CHECK_PHONE,
                request,
                {
                    headers: googleVerificationToken
                        ? {
                            Authorization:
                                `Bearer ${googleVerificationToken}`
                        }
                        : undefined
                }
            );

        return response.data;
    },

    register: async (
        request: RegisterRequest
    ): Promise<AuthResponse> => {

        const response =
            await api.post<AuthResponse>(
                API_ENDPOINTS.AUTH_REGISTER,
                request
            );

        return response.data;
    },

    googleLogin: async (
        request: GoogleLoginRequest
    ): Promise<AuthResponse> => {

        const response =
            await api.post<AuthResponse>(
                API_ENDPOINTS.AUTH_GOOGLE,
                request
            );

        return response.data;
    },

};