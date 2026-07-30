export type ProductWeight = "250g" | "500g" | "1kg";

export interface CartItem {
    productId: number;
    weight: ProductWeight;
    quantity: number;
}