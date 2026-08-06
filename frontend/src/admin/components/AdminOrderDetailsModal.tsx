import type { Order } from "../../types/Order";

import "../styles/AdminOrderDetailsModal.css";

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

                <table className="items-table">

                    <thead>

                        <tr>

                            <th>Product</th>

                            <th>Weight</th>

                            <th>Qty</th>

                            <th>Price</th>

                            <th>Total</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            order.items.map((item) => (

                                <tr

                                    key={`${item.productId}-${item.weight}`}

                                >

                                    <td>

                                        {item.productName}

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

                            ))

                        }

                    </tbody>

                </table>

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