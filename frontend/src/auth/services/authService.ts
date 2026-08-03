import api from "../../services/api";
import type { AuthResponse } from "../models/AuthResponse";
import type { LoginRequest } from "../models/LoginRequest";
import type { OtpVerifyRequest } from "../models/OtpVerifyRequest";
import type { RegisterRequest } from "../models/RegisterRequest";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { MessageResponse } from "../models/MessageResponse";

export const authService = {

    sendOtp: async (
        request: LoginRequest
    ): Promise<MessageResponse> => {

        const response = await api.post<MessageResponse>(  API_ENDPOINTS.AUTH_SEND_OTP,  request    );
        return response.data;
    },

    verifyOtp: async (
        request: OtpVerifyRequest
    ): Promise<AuthResponse> => {

        const response = await api.post<AuthResponse>(  API_ENDPOINTS.AUTH_VERIFY_OTP,  request    );
        return response.data;

    },

    register: async (
        request: RegisterRequest
    ): Promise<AuthResponse> => {

        const response = await api.post<AuthResponse>(  API_ENDPOINTS.AUTH_REGISTER,  request    );
        return response.data;

    }

};