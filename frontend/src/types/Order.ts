export type PaymentStatus =
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

export type PaymentMethod =
    | "COD"
    | "ONLINE";

export interface Order {

    orderId: number;

    customerId: number;

    customerName: string;

    totalAmount: number;

    orderStatus: string;

    paymentStatus: PaymentStatus;

    paymentMethod: PaymentMethod;

    deliveryType: "LOCAL" | "COURIER";

    deliveryAddress: string;

    latitude: number | null;

    longitude: number | null;

    createdAt: string;

    items: OrderItem[];

}

export interface OrderItem {

    itemType: "PRODUCT" | "SWEET_BOX" | "COMBO_PACK";

    productId: number | null;
    productName: string | null;

    sweetBoxId: number | null;
    sweetBoxName: string | null;

    comboPackId: number | null;
    comboPackName: string | null;

    weight: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
}