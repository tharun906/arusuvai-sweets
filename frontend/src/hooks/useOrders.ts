import { useState } from "react";
import { orderService } from "../services/orderService";
import type { Order } from "../types/Order";

export function useOrders() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [cancelling, setCancelling] = useState(false);

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

    const cancelOrder = async (
        orderId: number
    ): Promise<void> => {

        setCancelling(true);

        try {

            await orderService.cancelOrder(orderId);

            // Refresh My Orders so the UI immediately
            // reflects CANCELLED / REFUNDED status.
            await loadOrders();

        } finally {

            setCancelling(false);

        }
    };

    return {
        orders,
        loading,
        cancelling,
        loadOrders,
        cancelOrder
    };
}