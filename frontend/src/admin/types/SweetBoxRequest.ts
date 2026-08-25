export interface SweetBoxItemRequest {
    productId: number;
    quantity: number;
}

export interface SweetBoxRequest {
    name: string;
    totalWeight: string;
    price: number;
    imageUrl: string;
    active: boolean;
    items: SweetBoxItemRequest[];
}