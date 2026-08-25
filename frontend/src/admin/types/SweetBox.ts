export interface SweetBoxItem {
    productId: number;
    productName: string;
    quantity: number;
}

export interface SweetBox {
    id: number;
    name: string;
    totalWeight: string;
    price: number;
    imageUrl: string;
    active: boolean;
    items: SweetBoxItem[];
}