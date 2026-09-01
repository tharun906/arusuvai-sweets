export type PaymentStatus =
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED";

export interface Order {

    orderId: number;

    customerId: number;

    customerName: string;

    totalAmount: number;

    orderStatus: string;

    paymentStatus: PaymentStatus;

    deliveryType: "LOCAL" | "COURIER";

    deliveryAddress: string;

    latitude: number | null;

    longitude: number | null;

    createdAt: string;

    items: OrderItem[];

}

export interface OrderItem {

    itemType: "PRODUCT" | "SWEET_BOX";

    productId: number | null;
    productName: string | null;

    sweetBoxId: number | null;
    sweetBoxName: string | null;

    weight: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
}