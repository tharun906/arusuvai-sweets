import type { PaymentResponse } from "./PaymentResponse";


export interface OrderCreationResponse {

    orderId: number;

    paymentMethod: "COD" | "ONLINE";

    paymentRequired: boolean;

    payment: PaymentResponse | null;

}