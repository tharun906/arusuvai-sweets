export type ProductWeight = "250g" | "500g" | "1kg";

export type CartItemType =
    | "PRODUCT"
    | "SWEET_BOX"
    | "COMBO_PACK";

export interface CartItem {

    itemType: CartItemType;

    productId?: number;

    sweetBoxId?: number;

    comboPackId?: number;

    weight?: ProductWeight;

    quantity: number;
}