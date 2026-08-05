import { useState } from "react";
import type { Order } from "../../types/Order";
import { adminOrderService } from "../services/ adminOrderService";


export function useAdminOrders() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    const loadOrders = async () => {
        setLoading(true);
        try {

            const response = await adminOrderService.getAllOrders();
            setOrders(response);

        } finally {
            setLoading(false);
        }

    };

    const updateStatus = async (
        orderId: number,
        orderStatus: string
    ) => {
    
        await adminOrderService.updateOrderStatus(
    
            orderId,
    
            {
    
                orderStatus,
    
            }
    
        );
    
        await loadOrders();
    
    };

    return {

        orders,

        loading,

        loadOrders,

        updateStatus

    };

}