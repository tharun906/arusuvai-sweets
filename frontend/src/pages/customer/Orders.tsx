import { useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";
import "../../styles/Orders.css";
import OrderCard from "../../components/orders/OrderCard";
import { useAuthContext } from "../../auth/context/AuthContext";
import Loading from "../../components/common/Loading";

function Orders() {

    const {
        orders,
        loading,
        cancelling,
        loadOrders,
        cancelOrder
    } = useOrders();

    const { isLoggedIn } = useAuthContext();

    useEffect(() => {

        if (!isLoggedIn) return;

        loadOrders();

    }, [isLoggedIn]);

    if (loading) {
        return <Loading />;
    }

    /*
     * ========================================
     * LOGGED OUT
     * ========================================
     */
    if (!isLoggedIn) {

        return (
            <div className="orders-page orders-locked">

                <h1 className="orders-title">
                    My Orders
                </h1>

                <div className="orders-locked-content">

                    <div className="orders-preview">

                        <div className="orders-preview-card">
                            <div className="orders-preview-line large" />
                            <div className="orders-preview-line" />
                            <div className="orders-preview-line short" />
                        </div>

                        <div className="orders-preview-card">
                            <div className="orders-preview-line large" />
                            <div className="orders-preview-line" />
                            <div className="orders-preview-line short" />
                        </div>

                        <div className="orders-preview-card">
                            <div className="orders-preview-line large" />
                            <div className="orders-preview-line" />
                            <div className="orders-preview-line short" />
                        </div>

                    </div>

                    <div className="orders-locked-overlay">

                        <div className="orders-lock-icon">
                            🔒
                        </div>

                        <h2>
                            Login to see your orders
                        </h2>

                        <p>
                            Sign in to view your order history
                            and track your purchases.
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    /*
     * ========================================
     * NO ORDERS
     * ========================================
     */
    if (orders.length === 0) {

        return (
            <div className="orders-empty">

                <h2>
                    📦 No Orders Yet
                </h2>

                <p>
                    Looks like you haven't placed any orders yet.
                </p>

            </div>
        );
    }

    /*
     * ========================================
     * LOGGED-IN ORDERS
     * ========================================
     */
    return (
        <div className="orders-page">

            <h1 className="orders-title">
                My Orders
            </h1>

            {orders.map(order => (

                <OrderCard
                    key={order.orderId}
                    order={order}
                    onCancel={cancelOrder}
                    cancelling={cancelling}
                />

            ))}

        </div>
    );
}

export default Orders;