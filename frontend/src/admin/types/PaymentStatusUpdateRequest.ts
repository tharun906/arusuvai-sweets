export interface PaymentStatusUpdateRequest {

    paymentStatus:
        | "PENDING"
        | "PAID"
        | "FAILED"
        | "REFUNDED";

}