import api from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { Order } from "../types/Order";
import type { OrderRequest } from "../types/OrderRequest";
import type { PaymentResponse } from "../types/PaymentResponse";

export const orderService = {

    createOrder: async (
        request: OrderRequest
    ): Promise<PaymentResponse> => {

        const response = await api.post<PaymentResponse>(
            API_ENDPOINTS.ORDERS,
            request
        );

        return response.data;

    },

    getOrders: async (
        customerId: number
    ): Promise<Order[]> => {

        const response = await api.get<Order[]>(
            `${API_ENDPOINTS.ORDERS}/customer/${customerId}`
        );

        return response.data;

    }

};