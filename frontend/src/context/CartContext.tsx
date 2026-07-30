import {createContext,useContext,useMemo,useState,type ReactNode} from "react";
import type { CartItem, ProductWeight } from "../types/CartItem";

interface CartContextType {
    cartItems: CartItem[];
    increaseQuantity: (productId: number, weight: ProductWeight) => void;
    decreaseQuantity: (productId: number, weight: ProductWeight) => void;
    removeFromCart: (productId: number, weight: ProductWeight) => void;
    clearCart: () => void;
    addToCart: (item: CartItem) => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const increaseQuantity = (
        productId: number,
        weight: ProductWeight
    ) => {
    
        setCartItems((previousItems) =>
            previousItems.map((item) =>
                item.productId === productId &&
                item.weight === weight
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item
            )
        );
    
    };


    const decreaseQuantity = (
        productId: number,
        weight: ProductWeight
    ) => {
    
        setCartItems((previousItems) =>
            previousItems
                .map((item) =>
                    item.productId === productId &&
                    item.weight === weight
                        ? {
                              ...item,
                              quantity: item.quantity - 1,
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    
    };

    const removeFromCart = (
        productId: number,
        weight: ProductWeight
    ) => {
    
        setCartItems((previousItems) =>
            previousItems.filter(
                (item) =>
                    !(
                        item.productId === productId &&
                        item.weight === weight
                    )
            )
        );
    
    };

    const clearCart = () => {

        setCartItems([]);
    
    };

    const addToCart = (item: CartItem) => {

        setCartItems((previousItems) => {

            const existingItem = previousItems.find(
                (cartItem) =>
                    cartItem.productId === item.productId &&
                    cartItem.weight === item.weight
            );

            if (existingItem) {

                return previousItems.map((cartItem) =>

                    cartItem.productId === item.productId &&
                    cartItem.weight === item.weight
                        ? {
                              ...cartItem,
                              quantity:
                                  cartItem.quantity + item.quantity,
                          }
                        : cartItem
                );
            }

            return [...previousItems, item];
        });
    };

    const cartCount = useMemo(() => {

        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

    }, [cartItems]);

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

    const context = useContext(CartContext);

    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }

    return context;
}