import type { PaymentResponse } from "../types/PaymentResponse";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface RazorpayCallbacks {
    onSuccess: (response: any) => void;
    onFailure?: (response: any) => void;
    onClose?: () => void;
}

export const openRazorpay = (
    payment: PaymentResponse,
    callbacks: RazorpayCallbacks
) => {

    const options = {

        key: payment.keyId,

        amount: payment.amount,

        currency: payment.currency,

        order_id: payment.razorpayOrderId,

        name: "Arusuvai Sweets",

        description: "Order Payment",

        handler: (response: any) => {

            callbacks.onSuccess(response);

        },

        modal: {

            ondismiss: () => {

                callbacks.onClose?.();

            }

        }

    };


    const razorpay =
        new window.Razorpay(options);


    razorpay.on(
        "payment.failed",
        (response: any) => {

            callbacks.onFailure?.(
                response
            );

        }
    );


    razorpay.open();

};