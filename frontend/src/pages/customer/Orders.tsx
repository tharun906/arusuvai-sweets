import { useEffect } from "react";
import { useOrders } from "../../hooks/useOrders";


function Orders() {

    const { orders, loading, loadOrders } = useOrders();

    useEffect(() => {

        loadOrders(1);

    }, []);

    if (loading) {

        return <h2>Loading Orders...</h2>;

    }

    if (orders.length === 0) {

        return <h2>No Orders Found</h2>;

    }

    return (

        <div>

            <h1>My Orders</h1>

            {orders.map((order) => (

                <div key={order.orderId}>

                    <h3>Order #{order.orderId}</h3>

                    <p>Total : ₹{order.totalAmount}</p>

                    <p>Order Status : {order.orderStatus}</p>

                    <p>Payment Status : {order.paymentStatus}</p>

                    <p>Created : {order.createdAt}</p>

                    <h4>Items</h4>

                    {order.items.map((item) => (

                        <div
                            key={`${order.orderId}-${item.productId}-${item.weight}`}
                        >

                            <p>{item.productName}</p>

                            <p>Weight : {item.weight}</p>

                            <p>Quantity : {item.quantity}</p>

                            <p>Price : ₹{item.totalPrice}</p>

                            <hr />

                        </div>

                    ))}

                </div>

            ))}

        </div>

    );

}

export default Orders;