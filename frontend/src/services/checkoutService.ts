import api from "./api";

import type { CheckoutRequest } from "../types/CheckoutRequest";
import type { CheckoutSummary } from "../types/CheckoutSummary";


import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { DeliveryCheckResponse } from "../auth/models/DeliveryCheckResponse";
import type { DeliveryCheckRequest } from "../auth/models/DeliveryCheckRequest";

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

    checkDelivery: async (
        request: DeliveryCheckRequest
    ): Promise<DeliveryCheckResponse> => {

        const response = await api.post<DeliveryCheckResponse>(
            API_ENDPOINTS.CHECK_DELIVERY,
            request
        );

        return response.data;

    }

};