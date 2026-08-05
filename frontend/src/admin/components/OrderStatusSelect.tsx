import { useState } from "react";

interface OrderStatusSelectProps {

    orderId: number;

    currentStatus: string;

    onUpdate: (
        orderId: number,
        orderStatus: string
    ) => Promise<void>;

}

function OrderStatusSelect({

    orderId,

    currentStatus,

    onUpdate,

}: OrderStatusSelectProps) {

    const [status, setStatus] =
        useState(currentStatus);

    const [loading, setLoading] =
        useState(false);

    const handleUpdate = async () => {

        setLoading(true);

        try {

            await onUpdate(

                orderId,

                status

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <select

                value={status}

                onChange={(event) =>

                    setStatus(event.target.value)

                }

            >

                <option value="PENDING_PAYMENT">

                    PENDING_PAYMENT

                </option>

                <option value="PREPARING">

                    PREPARING

                </option>

                <option value="OUT_FOR_DELIVERY">

                    OUT_FOR_DELIVERY

                </option>

                <option value="DELIVERED">

                    DELIVERED

                </option>

            </select>

            <button

                onClick={handleUpdate}

                disabled={loading}

            >

                {

                    loading

                        ? "Updating..."

                        : "Update"

                }

            </button>

        </div>

    );

}

export default OrderStatusSelect;