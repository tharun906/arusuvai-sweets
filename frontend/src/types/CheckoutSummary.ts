import type { CheckoutItem } from "./CheckoutItem";

export interface CheckoutSummary {
    items: CheckoutItem[];
    subtotal: number;
    deliveryCharge: number;
    grandTotal: number;
}