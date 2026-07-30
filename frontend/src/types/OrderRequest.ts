import type { CartItem } from "./CartItem";

export interface OrderRequest {
    customerId: number;
    items: CartItem[];
}