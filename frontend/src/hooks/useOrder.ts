import { useState } from "react";
import { orderService } from "../services/orderService";
import type { OrderRequest } from "../types/OrderRequest";
import type { OrderCreationResponse } from "../types/OrderCreationResponse";

export function useOrder() {

    const [loading, setLoading] = useState(false);

    const createOrder = async (
        request: OrderRequest
    ): Promise<OrderCreationResponse> => {

        setLoading(true);

        try {

            return await orderService.createOrder(request);

        } finally {

            setLoading(false);

        }

    };

    return {

        createOrder,
        loading

    };

}