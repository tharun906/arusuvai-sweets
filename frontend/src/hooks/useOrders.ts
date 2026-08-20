import { useState } from "react";
import { orderService } from "../services/orderService";
import type { Order } from "../types/Order";

export function useOrders() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    const loadOrders = async (): Promise<void> => {

        setLoading(true);

        try {

            const data =
                await orderService.getOrders();

            setOrders(data);

        } finally {

            setLoading(false);

        }
    };

    return {
        orders,
        loading,
        loadOrders
    };
}