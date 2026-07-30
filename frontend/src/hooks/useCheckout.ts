import { useState } from "react";

import { checkoutService } from "../services/checkoutService";

import type { CheckoutRequest } from "../types/CheckoutRequest";
import type { CheckoutSummary } from "../types/CheckoutSummary";

export function useCheckout() {

    const [summary, setSummary] =
        useState<CheckoutSummary | null>(null);

    const [loading, setLoading] = useState(false);

    const getCheckoutSummary = async (
        request: CheckoutRequest
    ) => {

        setLoading(true);

        try {

            const response =
                await checkoutService.getCheckoutSummary(
                    request
                );

            setSummary(response);

        } finally {

            setLoading(false);

        }

    };

    return {

        summary,

        loading,

        getCheckoutSummary,

    };

}