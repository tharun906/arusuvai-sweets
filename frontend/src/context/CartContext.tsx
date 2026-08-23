import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type {
    CartItem,
    ProductWeight,
} from "../types/CartItem";

interface CartContextType {

    cartItems: CartItem[];

    increaseQuantity: (
        item: CartItem
    ) => void;

    decreaseQuantity: (
        item: CartItem
    ) => void;

    removeFromCart: (
        item: CartItem
    ) => void;

    clearCart: () => void;

    addToCart: (
        item: CartItem
    ) => void;

    cartCount: number;
}

const CartContext =
    createContext<CartContextType | undefined>(
        undefined
    );

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({
    children,
}: CartProviderProps) {

    const [
        cartItems,
        setCartItems,
    ] = useState<CartItem[]>([]);


    const isSameItem = (
        first: CartItem,
        second: CartItem
    ): boolean => {

        if (
            first.itemType !==
            second.itemType
        ) {
            return false;
        }

        if (
            first.itemType === "PRODUCT" &&
            second.itemType === "PRODUCT"
        ) {
            return (
                first.productId ===
                    second.productId &&
                first.weight ===
                    second.weight
            );
        }

        if (
            first.itemType === "SWEET_BOX" &&
            second.itemType === "SWEET_BOX"
        ) {
            return (
                first.sweetBoxId ===
                second.sweetBoxId
            );
        }

        return false;
    };


    const increaseQuantity = (
        item: CartItem
    ) => {

        setCartItems(
            previousItems =>
                previousItems.map(
                    cartItem =>
                        isSameItem(
                            cartItem,
                            item
                        )
                            ? {
                                  ...cartItem,
                                  quantity:
                                      cartItem.quantity +
                                      1,
                              }
                            : cartItem
                )
        );
    };


    const decreaseQuantity = (
        item: CartItem
    ) => {

        setCartItems(
            previousItems =>
                previousItems
                    .map(cartItem =>
                        isSameItem(
                            cartItem,
                            item
                        )
                            ? {
                                  ...cartItem,
                                  quantity:
                                      cartItem.quantity -
                                      1,
                              }
                            : cartItem
                    )
                    .filter(
                        cartItem =>
                            cartItem.quantity >
                            0
                    )
        );
    };


    const removeFromCart = (
        item: CartItem
    ) => {

        setCartItems(
            previousItems =>
                previousItems.filter(
                    cartItem =>
                        !isSameItem(
                            cartItem,
                            item
                        )
                )
        );
    };


    const clearCart = () => {

        setCartItems([]);

    };


    const addToCart = (
        item: CartItem
    ) => {

        setCartItems(
            previousItems => {

                const existingItem =
                    previousItems.find(
                        cartItem =>
                            isSameItem(
                                cartItem,
                                item
                            )
                    );

                if (existingItem) {

                    return previousItems.map(
                        cartItem =>
                            isSameItem(
                                cartItem,
                                item
                            )
                                ? {
                                      ...cartItem,
                                      quantity:
                                          cartItem.quantity +
                                          item.quantity,
                                  }
                                : cartItem
                    );
                }

                return [
                    ...previousItems,
                    item,
                ];
            }
        );
    };


    const cartCount = useMemo(
        () =>
            cartItems.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    item.quantity,
                0
            ),
        [cartItems]
    );


    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>

    );
}


export function useCart() {

    const context =
        useContext(CartContext);

    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }

    return context;
}