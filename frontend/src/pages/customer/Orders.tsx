import { useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";
import "../../styles/Orders.css";
import OrderCard from "../../components/orders/OrderCard";

function Orders() {

    const { orders, loading, loadOrders } = useOrders();

    useEffect(() => {

        loadOrders(1);

    }, []);

    if (loading) {

        return (

            <div className="orders-loading">

                <h2>Loading your orders...</h2>

            </div>

        );

    }

    if (orders.length === 0) {

        return (

            <div className="orders-empty">

                <h2>📦 No Orders Yet</h2>

                <p>
                    Looks like you haven't placed any orders yet.
                </p>

            </div>

        );

    }

    return (

        <div className="orders-page">

            <h1 className="orders-title">

                My Orders

            </h1>

            {orders.map((order) => (

                <OrderCard
                    key={order.orderId}
                    order={order}
                />

            ))}

        </div>

    );

}

export default Orders;