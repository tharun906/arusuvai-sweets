import type { OrderItem } from "../../types/Order";

import "../../styles/OrderItemRow.css";

interface OrderItemRowProps {
    item: OrderItem;
}

function OrderItemRow({ item }: OrderItemRowProps) {

    return (

        <div className="order-item">

            <div className="order-item-details">

                <h4>{item.productName}</h4>

                <p>
                    {item.weight} × {item.quantity}
                </p>

            </div>

            <div className="order-item-price">

                ₹{item.totalPrice}

            </div>

        </div>

    );

}

export default OrderItemRow;