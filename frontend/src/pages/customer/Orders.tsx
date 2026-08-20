import { useEffect, useState } from "react";

import { useOrders } from "../../hooks/useOrders";
import "../../styles/Orders.css";

import OrderCard from "../../components/orders/OrderCard";

import { useAuthContext } from "../../auth/context/AuthContext";
import GoogleLoginFallback from "../../auth/components/GoogleLoginFallback";


function Orders() {

    const {
        orders,
        loading,
        loadOrders
    } = useOrders();


    const {
        isLoggedIn
    } = useAuthContext();


    const [
        showGoogleLogin,
        setShowGoogleLogin
    ] = useState(false);


    useEffect(() => {

        if (!isLoggedIn) {

            setShowGoogleLogin(true);

            return;
        }


        loadOrders();

    }, [isLoggedIn]);


    if (showGoogleLogin && !isLoggedIn) {

        return (

            <GoogleLoginFallback

                onSuccess={() => {

                    setShowGoogleLogin(false);

                }}

                onClose={() => {

                    setShowGoogleLogin(false);

                }}

                onError={message => {

                    console.error(
                        "Google login:",
                        message
                    );

                }}

            />

        );

    }


    if (loading) {

        return (

            <div className="orders-loading">

                <h2>
                    Loading your orders...
                </h2>

            </div>

        );
    }


    if (orders.length === 0) {

        return (

            <div className="orders-empty">

                <h2>
                    📦 No Orders Yet
                </h2>

                <p>
                    Looks like you haven't
                    placed any orders yet.
                </p>

            </div>

        );
    }


    return (

        <div className="orders-page">

            <h1 className="orders-title">
                My Orders
            </h1>


            {orders.map(order => (

                <OrderCard

                    key={order.orderId}

                    order={order}

                />

            ))}

        </div>

    );
}


export default Orders;