import { useState } from "react";
import type { Order } from "../../types/Order";
import OrderItemRow from "./OrderItemRow";
import { formatDate } from "../../utils/dateFormatter";
import "../../styles/OrderCard.css";

interface OrderCardProps {
    order: Order;
    onCancel: (orderId: number) => Promise<void>;
    cancelling: boolean;
}

function OrderCard({
    order,
    onCancel,
    cancelling
}: OrderCardProps) {

    const [showCancelPopup, setShowCancelPopup] =
        useState(false);

    /*
     * ========================================
     * CANCELLATION ELIGIBILITY
     * ========================================
     */

    const isLocalCancellationAllowed =
    order.deliveryType === "LOCAL" &&
    order.orderStatus === "PREPARING";

    const isCourierCancellationAllowed =
        order.deliveryType === "COURIER" &&
        order.orderStatus === "PREPARING";

    const canCancel =
        order.paymentStatus !== "FAILED" &&
        order.orderStatus !== "CANCELLED" &&
        order.orderStatus !== "DELIVERED" &&
        (
            isLocalCancellationAllowed ||
            isCourierCancellationAllowed
        );

    /*
     * ========================================
     * CANCELLED BUT CUTOFF REACHED
     * ========================================
     *
     * Show a dimmed button when cancellation
     * was available earlier but is no longer
     * available because delivery has progressed.
     */
    const cancellationCutoffReached =
        !canCancel &&
        (
            (
                order.deliveryType === "LOCAL" &&
                order.orderStatus === "OUT_FOR_DELIVERY"
            )
            ||
            (
                order.deliveryType === "COURIER" &&
                order.orderStatus === "COURIER_DISPATCHED"
            )
        );

    const handleContinueCancel = async () => {

        try {

            await onCancel(order.orderId);

            setShowCancelPopup(false);

        } catch {

            // Keep popup open if cancellation/refund fails.
            // The API layer / global error handling can
            // display the actual error message.

        }
    };

    return (

        <div className="order-card">

            <div className="order-header">

                <div>

                    <h2>
                        📦 Order #{order.orderId}
                    </h2>

                    <p className="order-date">
                        {formatDate(order.createdAt)}
                    </p>

                </div>

                <div className="status-container">

                    <div className="status-group">

                        <span className="status-label">
                            Payment :
                        </span>

                        <span
                            className={`payment-status ${order.paymentStatus.toLowerCase()}`}
                        >
                            {order.paymentStatus}
                        </span>

                    </div>

                    <div className="status-group">

                        <span className="status-label">
                            Delivery :
                        </span>

                        <span
                            className={`order-status ${order.orderStatus.toLowerCase()}`}
                        >
                            {order.orderStatus.replace("_", " ")}
                        </span>

                    </div>

                </div>

            </div>

            <div className="order-items">

            {order.items.map((item) => (

                <OrderItemRow
                    key={`${item.itemType}-${item.productId ?? item.sweetBoxId ?? item.comboPackId}-${item.weight}`}
                    item={item}
                />

            ))}

            </div>

            <div className="order-footer">

                <span>
                    Total
                </span>

                <span>
                    ₹{order.totalAmount}
                </span>

            </div>

            {/* ========================================
                CANCEL BUTTON
            ======================================== */}

            {(canCancel || cancellationCutoffReached) && (

                <div className="order-cancel-section">

                    <button
                        type="button"
                        className={`cancel-order-button ${
                            cancellationCutoffReached
                                ? "cancel-order-disabled"
                                : ""
                        }`}
                        disabled={
                            cancellationCutoffReached ||
                            cancelling
                        }
                        onClick={() => {

                            if (!cancellationCutoffReached) {
                                setShowCancelPopup(true);
                            }

                        }}
                    >
                        {cancelling
                            ? "Cancelling..."
                            : "Cancel Order"
                        }
                    </button>

                </div>

            )}

            {/* ========================================
                CONFIRMATION POPUP
            ======================================== */}

            {showCancelPopup && (

                <div className="cancel-modal-overlay">

                    <div className="cancel-modal">

                        <h3>
                            Are you sure you want to cancel
                            this order?
                        </h3>

                        {order.paymentMethod === "ONLINE" ? (

                            <p>
                                Only 80% of the paid amount
                                will be refunded.
                            </p>

                        ) : (

                            <p>
                                This order has not been paid yet.
                                No payment has been collected.
                            </p>

                        )}

                        <div className="cancel-modal-actions">

                            <button
                                type="button"
                                className="cancel-modal-back"
                                disabled={cancelling}
                                onClick={() =>
                                    setShowCancelPopup(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="cancel-modal-confirm"
                                disabled={cancelling}
                                onClick={handleContinueCancel}
                            >
                                {cancelling
                                    ? "Processing..."
                                    : "Continue"
                                }
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}

export default OrderCard;