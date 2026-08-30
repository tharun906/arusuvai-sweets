import { useEffect, useState } from "react";
import { useAdminOrders } from "../hooks/useAdminOrders";
import "../styles/AdminOrders.css";
import PaymentStatusSelect from "../components/PaymentStatusSelect";
import type { Order } from "../../types/Order";
import AdminOrderDetailsModal from "../components/AdminOrderDetailsModal";
import OrderStatusSelect from "../components/OrderStatusSelect";
import Loading from "../../components/common/Loading";

function Orders() {
    const { orders, loading, loadOrders, updateStatus, updatePaymentStatus } = useAdminOrders();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="admin-orders-page">
            <h1 className="admin-orders-title">Admin Orders</h1>
            <div className="admin-orders-table-container">
                <table className="admin-orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Order Status</th>
                            <th>Payment</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>#{order.orderId}</td>
                                <td>{order.customerName}</td>
                                <td>₹{order.totalAmount}</td>
                                <td>
                                    <OrderStatusSelect
                                        orderId={order.orderId}
                                        currentStatus={order.orderStatus}
                                        deliveryType={order.deliveryType}
                                        onUpdate={updateStatus}
                                    />
                                </td>
                                <td>
                                    <PaymentStatusSelect
                                        orderId={order.orderId}
                                        currentStatus={order.paymentStatus}
                                        onUpdate={updatePaymentStatus}
                                    />
                                </td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td>
                                    <button className="view-btn" onClick={() => setSelectedOrder(order)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <AdminOrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    );
}

export default Orders;