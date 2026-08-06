import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import api from "../../services/api";
import type { Order } from "../../types/Order";
import type { OrderStatusUpdateRequest } from "../types/OrderStatusUpdateRequest";
import type { PaymentStatusUpdateRequest } from "../types/PaymentStatusUpdateRequest";


export const adminOrderService = {

    getAllOrders: async (): Promise<Order[]> => {
        const response = await api.get<Order[]>(  API_ENDPOINTS.ADMIN_ORDERS  );
        return response.data;
    },

    updateOrderStatus: async (  orderId: number,  request: OrderStatusUpdateRequest ) => {
        const response = await api.put(`${API_ENDPOINTS.ADMIN_ORDERS}/${orderId}/status`, request);
        return response.data;
    },

    updatePaymentStatus: async ( orderId: number, request: PaymentStatusUpdateRequest ) => {
        const response = await api.put(`${API_ENDPOINTS.ADMIN_ORDERS}/${orderId}/payment-status`, request);
        return response.data;
    },
};