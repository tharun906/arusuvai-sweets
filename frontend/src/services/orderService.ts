import api from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { Order } from "../types/Order";
import type { OrderRequest } from "../types/OrderRequest";
import type { OrderCreationResponse } from "../types/OrderCreationResponse";

export const orderService = {

    createOrder: async (
        request: OrderRequest
    ): Promise<OrderCreationResponse> => {

        const response = await api.post<OrderCreationResponse>(
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