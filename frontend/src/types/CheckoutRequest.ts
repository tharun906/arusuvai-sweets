import type { CartItem } from "./CartItem";

export interface CheckoutRequest {
    customerId: number;
    items: CartItem[];
}