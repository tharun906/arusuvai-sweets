export interface PaymentVerifyRequest {

    orderId: number;

    razorpayOrderId: string;

    razorpayPaymentId: string;

    razorpaySignature: string;

}