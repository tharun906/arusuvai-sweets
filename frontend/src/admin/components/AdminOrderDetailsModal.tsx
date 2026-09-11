import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Order } from "../../types/Order";

import "../styles/AdminOrderDetailsModal.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface AdminOrderDetailsModalProps {

    order: Order;

    onClose: () => void;

}

function AdminOrderDetailsModal({

    order,

    onClose,

}: AdminOrderDetailsModalProps) {

    return (

        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>
                        Order #{order.orderId}
                    </h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <div className="order-info">

                    <p>
                        <strong>Customer:</strong>
                        {order.customerName}
                    </p>

                    <p>
                        <strong>Address:</strong>
                        {order.deliveryAddress}
                    </p>

                    <div className="directions-container">

                        {order.latitude != null &&
                            order.longitude != null && (

                                <button
                                    type="button"
                                    className="directions-btn"
                                    onClick={() => {

                                        const mapsUrl =
                                            `https://www.google.com/maps/dir/?api=1&destination=${order.latitude},${order.longitude}`;

                                        window.open(
                                            mapsUrl,
                                            "_blank"
                                        );

                                    }}
                                >

                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                    />

                                    {" "}Get Directions

                                </button>

                            )}

                    </div>

                    <p>
                        <strong>Payment:</strong>
                        {order.paymentStatus}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        {order.orderStatus}
                    </p>

                </div>

                <h3>
                    Ordered Items
                </h3>

                <div className="items-table-container">

                    <table className="items-table">

                        <thead>

                            <tr>

                                <th>Item</th>

                                <th>Weight</th>

                                <th>Qty</th>

                                <th>Price</th>

                                <th>Total</th>

                            </tr>

                        </thead>

                        <tbody>

                            {order.items.map((item) => (

                                <tr
                                    key={`${item.itemType}-${item.productId ?? item.sweetBoxId ?? item.comboPackId}-${item.weight}`}
                                >

                                    <td>

                                        {item.itemType === "PRODUCT"
                                            ? item.productName
                                            : item.itemType === "SWEET_BOX"
                                                ? item.sweetBoxName
                                                : item.comboPackName}

                                    </td>

                                    <td>
                                        {item.weight}
                                    </td>

                                    <td>
                                        {item.quantity}
                                    </td>

                                    <td>
                                        ₹{item.pricePerUnit}
                                    </td>

                                    <td>
                                        ₹{item.totalPrice}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="order-total">

                    <strong>
                        Total : ₹{order.totalAmount}
                    </strong>

                </div>

            </div>

        </div>

    );

}

export default AdminOrderDetailsModal;