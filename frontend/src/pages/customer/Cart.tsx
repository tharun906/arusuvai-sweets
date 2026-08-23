import { useState } from "react";
import styles from "./cart.module.css";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../hooks/useProducts";
import { useAuthContext } from "../../auth/context/AuthContext";
import GoogleLoginFallback from "../../auth/components/GoogleLoginFallback";
import EmptyCart from "../../components/cart/EmptyCart";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import { useAccountModal } from "../../context/AccountModalContext";
import { PendingAction } from "../../constants/PendingAction";

function Cart() {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const { setPendingAction, openModal } = useAccountModal();
    const { products, loading } = useProducts();
    const { isLoggedIn } = useAuthContext();
    const [showGoogleLogin, setShowGoogleLogin] = useState(false);

    if (loading) {
        return <>Loading...</>;
    }

    if (cartItems.length === 0) {
        return <EmptyCart />;
    }

    const grandTotal = cartItems.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
            return total;
        }
        const price = item.weight === "250g"
            ? product.price250g
            : item.weight === "500g"
                ? product.price500g
                : product.price1kg;
        return total + price * item.quantity;
    }, 0);

    const handleCheckout = () => {
        setPendingAction(PendingAction.CHECKOUT);
        if (isLoggedIn) {
            openModal();
            return;
        }
        setShowGoogleLogin(true);
    };

    /*
     * Google login fallback
     */
    if (showGoogleLogin) {
        return (
            <GoogleLoginFallback
                onSuccess={() => { setShowGoogleLogin(false); }}
                onClose={() => { setShowGoogleLogin(false); }}
                onError={message => {
                    console.error("Google login:", message);
                }}
            />
        );
    }

    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <div className={styles.items}>
                    {cartItems.map(item => {
                        const product = products.find(p => p.id === item.productId);
                        if (!product) {
                            return null;
                        }
                        const price = item.weight === "250g"
                            ? product.price250g
                            : item.weight === "500g"
                                ? product.price500g
                                : product.price1kg;

                        return (
                            <CartItem
                                key={`${item.productId}-${item.weight}`}
                                imageUrl={product.imageUrl}
                                productName={product.name}
                                weight={item.weight}
                                price={price}
                                quantity={item.quantity}
                                subtotal={price * item.quantity}
                                onIncrease={() => increaseQuantity(item.productId, item.weight)}
                                onDecrease={() => decreaseQuantity(item.productId, item.weight)}
                                onRemove={() => removeFromCart(item.productId, item.weight)}
                            />
                        );
                    })}
                </div>
                <CartSummary
                    total={grandTotal}
                    onCheckout={handleCheckout}
                />
            </div>
        </section>
    );
}

export default Cart;