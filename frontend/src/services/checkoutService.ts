import api from "./api";

import type { CheckoutRequest } from "../types/CheckoutRequest";
import type { CheckoutSummary } from "../types/CheckoutSummary";

import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const checkoutService = {

    getCheckoutSummary: async (
        request: CheckoutRequest
    ): Promise<CheckoutSummary> => {

        const response = await api.post<CheckoutSummary>(
            API_ENDPOINTS.CHECKOUT_SUMMARY,
            request
        );

        return response.data;

    },

};