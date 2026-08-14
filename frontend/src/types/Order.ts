export interface Order {

    orderId: number;

    customerId: number;

    customerName: string;

    totalAmount: number;

    orderStatus: string;

    paymentStatus: string;

    deliveryType: "LOCAL" | "COURIER";

    deliveryAddress: string;

    createdAt: string;

    items: OrderItem[];

}

export interface OrderItem {

    productId: number;

    productName: string;

    weight: string;

    quantity: number;

    pricePerUnit: number;

    totalPrice: number;

}