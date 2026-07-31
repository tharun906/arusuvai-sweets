import type { Order } from "../../types/Order";
import OrderItemRow from "./OrderItemRow";
import { formatDate } from "../../utils/dateFormatter";
import "../../styles/OrderCard.css";

interface OrderCardProps {
    order: Order;
}

function OrderCard({ order }: OrderCardProps) {

    return (

        <div className="order-card">

            <div className="order-header">

                <div>

                    <h2>📦 Order #{order.orderId}</h2>

                    <p className="order-date">
                        {formatDate(order.createdAt)}
                    </p>

                </div>

                <div className="status-container">

                    <span
                        className={`payment-status ${order.paymentStatus.toLowerCase()}`}
                    >
                        {order.paymentStatus}
                    </span>

                    <span
                        className={`order-status ${order.orderStatus.toLowerCase()}`}
                    >
                        {order.orderStatus.replace("_", " ")}
                    </span>

                </div>

            </div>

            <div className="order-items">

                {order.items.map((item) => (

                    <OrderItemRow
                        key={`${item.productId}-${item.weight}`}
                        item={item}
                    />

                ))}

            </div>

            <div className="order-footer">

                <span>Total</span>

                <span>₹{order.totalAmount}</span>

            </div>

        </div>

    );

}

export default OrderCard;