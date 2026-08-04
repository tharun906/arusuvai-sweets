import type { CartItem } from "./CartItem";

export interface OrderRequest {
    customerId: number;
    paymentMethod: "COD" | "ONLINE";
    items: CartItem[];
}