import "../styles/OrderStatusSelect.css";
import { useState } from "react";

interface OrderStatusSelectProps {
    orderId: number;
    currentStatus: string;
    deliveryType: "LOCAL" | "COURIER";
    onUpdate: (orderId: number, orderStatus: string) => Promise<void>;
}

function OrderStatusSelect({
    orderId,
    currentStatus,
    deliveryType,
    onUpdate
}: OrderStatusSelectProps) {

    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);

        try {
            await onUpdate(orderId, status);
        } finally {
            setLoading(false);
        }
    };

    if (
        currentStatus === "DELIVERED" ||
        currentStatus === "CANCELLED"
    ) {
        return (
            <span
                className={`order-status-badge ${
                    currentStatus === "CANCELLED"
                        ? "cancelled"
                        : "delivered"
                }`}
            >
                {currentStatus}
            </span>
        );
    }

    return (
        <div className="order-status-control">

            <select
                value={status}
                onChange={event => setStatus(event.target.value)}
            >

                {currentStatus === "PENDING_PAYMENT" && (
                    <>
                        <option value="PENDING_PAYMENT">
                            PENDING_PAYMENT
                        </option>

                        <option value="PREPARING">
                            PREPARING
                        </option>
                    </>
                )}

                {currentStatus === "PREPARING" && (
                    <>
                        <option value="PREPARING">
                            PREPARING
                        </option>

                        {deliveryType === "LOCAL" ? (
                            <option value="OUT_FOR_DELIVERY">
                                OUT_FOR_DELIVERY
                            </option>
                        ) : (
                            <option value="COURIER_DISPATCHED">
                                COURIER_DISPATCHED
                            </option>
                        )}
                    </>
                )}

                {currentStatus === "OUT_FOR_DELIVERY" && (
                    <>
                        <option value="OUT_FOR_DELIVERY">
                            OUT_FOR_DELIVERY
                        </option>

                        <option value="DELIVERED">
                            DELIVERED
                        </option>
                    </>
                )}

                {currentStatus === "COURIER_DISPATCHED" && (
                    <>
                        <option value="COURIER_DISPATCHED">
                            COURIER_DISPATCHED
                        </option>

                        <option value="DELIVERED">
                            DELIVERED
                        </option>
                    </>
                )}

            </select>

            {status !== currentStatus && (
                <button
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update"}
                </button>
            )}

        </div>
    );
}

export default OrderStatusSelect;