import { useState } from "react";

import { checkoutService } from "../services/checkoutService";
import type { CheckoutRequest } from "../types/CheckoutRequest";
import type { CheckoutSummary } from "../types/CheckoutSummary";
import type { DeliveryCheckResponse } from "../auth/models/DeliveryCheckResponse";
import type { DeliveryCheckRequest } from "../auth/models/DeliveryCheckRequest";


export function useCheckout() {

    const [summary, setSummary] =
        useState<CheckoutSummary | null>(null);

    const [deliveryStatus, setDeliveryStatus] =
        useState<DeliveryCheckResponse | null>(null);

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

    const checkDelivery = async (
        request: DeliveryCheckRequest
    ) => {

        setLoading(true);

        try {

            const response =
                await checkoutService.checkDelivery(
                    request
                );

            setDeliveryStatus(response);

        } finally {

            setLoading(false);
        }
    };

    return {
        summary,
        deliveryStatus,
        loading,
        getCheckoutSummary,
        checkDelivery

    };

}