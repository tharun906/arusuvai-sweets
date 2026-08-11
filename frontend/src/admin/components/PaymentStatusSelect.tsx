import { useState } from "react";
import "../styles/PaymentStatusSelect.css"

interface PaymentStatusSelectProps {

    orderId: number;

    currentStatus: string;

    onUpdate: (
        orderId: number,
        paymentStatus: string
    ) => Promise<void>;

}

function PaymentStatusSelect({

    orderId,

    currentStatus,

    onUpdate,

}: PaymentStatusSelectProps) {

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

    if (currentStatus !== "PENDING") {

        return (
    
            <span className={`payment-badge ${currentStatus.toLowerCase()}`}>
    
                {currentStatus}
    
            </span>
    
        );
    
    }
    
    return (
    
        <div className="payment-status-control">
    
            <select
    
                value={status}
    
                onChange={(event) =>
    
                    setStatus(event.target.value)
    
                }
    
            >
    
                <option value="PENDING">
    
                    PENDING
    
                </option>
    
                <option value="PAID">
    
                    PAID
    
                </option>
    
                <option value="FAILED">
    
                    FAILED
    
                </option>
    
                <option value="REFUNDED">
    
                    REFUNDED
    
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

export default PaymentStatusSelect;