import { useState } from "react";

import { paymentService } from "../services/paymentService";
import type { PaymentVerifyRequest } from "../types/PaymentVerifyRequest";

export function usePayment() {

    const [loading, setLoading] = useState(false);

    const verifyPayment = async (
        request: PaymentVerifyRequest
    ) => {

        setLoading(true);

        try {

            return await paymentService.verifyPayment(request);

        } finally {

            setLoading(false);

        }

    };

    return {

        loading,

        verifyPayment

    };

}