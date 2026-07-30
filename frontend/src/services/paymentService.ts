import api from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { PaymentVerifyRequest } from "../types/PaymentVerifyRequest";

export const paymentService = {

    verifyPayment: async (
        request: PaymentVerifyRequest
    ): Promise<string> => {

        const response = await api.post<string>(
            API_ENDPOINTS.PAYMENT_VERIFY,
            request
        );

        return response.data;

    }

};