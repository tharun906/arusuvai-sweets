import { useEffect } from "react";

import { useAdminOrders } from "../hooks/useAdminOrders";

import "../styles/AdminOrders.css";
import OrderStatusSelect from "../components/OrderStatusSelect";

function Orders() {

    const {

        orders,

        loading,

        loadOrders,

        updateStatus

    } = useAdminOrders();

    useEffect(() => {

        loadOrders();

    }, []);

    if (loading) {

        return (

            <div className="admin-orders-loading">

                Loading Orders...

            </div>

        );

    }

    return (

        <div className="admin-orders-page">

            <h1 className="admin-orders-title">

                Admin Orders

            </h1>

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

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map((order) => (

                                <tr key={order.orderId}>

                                    <td>

                                        #{order.orderId}

                                    </td>

                                    <td>

                                        {order.customerName}

                                    </td>

                                    <td>

                                        ₹{order.totalAmount}

                                    </td>

                                    <td>

                                    <OrderStatusSelect

                                        orderId={order.orderId}

                                        currentStatus={order.orderStatus}

                                        onUpdate={updateStatus}

                                    />

                                    </td>

                                    <td>

                                        <span className="payment-badge">

                                            {order.paymentStatus}

                                        </span>

                                    </td>

                                    <td>

                                        {new Date(order.createdAt)
                                            .toLocaleString()}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Orders;