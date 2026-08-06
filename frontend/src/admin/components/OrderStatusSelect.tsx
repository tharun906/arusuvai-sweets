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

    if (currentStatus === "DELIVERED") {

        return (

            <span className="order-status-badge delivered">

                DELIVERED

            </span>

        );

    }

    return (

        <div>

            <select

                value={status}

                onChange={(event) =>

                    setStatus(event.target.value)

                }

            >

                {

                    status === "PENDING_PAYMENT" && (

                        <>

                            <option value="PENDING_PAYMENT">

                                PENDING_PAYMENT

                            </option>

                            <option value="PREPARING">

                                PREPARING

                            </option>

                        </>

                    )

                }

                {

                    status === "PREPARING" && (

                        <>

                            <option value="PREPARING">

                                PREPARING

                            </option>

                            <option value="OUT_FOR_DELIVERY">

                                OUT_FOR_DELIVERY

                            </option>

                        </>

                    )

                }

                {

                    status === "OUT_FOR_DELIVERY" && (

                        <>

                            <option value="OUT_FOR_DELIVERY">

                                OUT_FOR_DELIVERY

                            </option>

                            <option value="DELIVERED">

                                DELIVERED

                            </option>

                        </>

                    )

                }

            </select>

            {

                status !== currentStatus && (

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

                )

                }

        </div>

    );

}

export default OrderStatusSelect;