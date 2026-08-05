export interface ProductRequest {

    name: string;

    description: string;

    imageUrl: string;

    price250g: number;

    price500g: number;

    price1kg: number;

    currentStockKg: number;

    lowStockAlertKg: number;

    categoryId: number;

}