import type { PaymentResponse } from "../types/PaymentResponse";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const openRazorpay = (
    payment: PaymentResponse,
    onSuccess: (response: any) => void
) => {

    const options = {

        key: payment.keyId,

        amount: payment.amount,

        currency: payment.currency,

        order_id: payment.razorpayOrderId,

        name: "Arusuvai Sweets",

        description: "Order Payment",

        handler: function (response: any) {

            onSuccess(response);

        }

    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

};