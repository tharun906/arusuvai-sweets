export interface CheckoutItem {

    itemType: "PRODUCT" | "SWEET_BOX";

    productId?: number;
    productName?: string;

    sweetBoxId?: number;
    sweetBoxName?: string;

    weight: string;

    quantity: number;

    unitPrice: number;

    totalPrice: number;
}