import type { OrderItem } from "../../types/Order";

import "../../styles/OrderItemRow.css";

interface OrderItemRowProps {
    item: OrderItem;
}

function OrderItemRow({ item }: OrderItemRowProps) {

    const itemName =
        item.itemType === "PRODUCT"
            ? item.productName
            : item.itemType === "SWEET_BOX"
                ? item.sweetBoxName
                : item.comboPackName;

    return (

        <div className="order-item">

            <div className="order-item-details">

                <h4>{itemName}</h4>

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