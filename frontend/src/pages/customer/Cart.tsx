import { useState } from "react";
import styles from "./cart.module.css";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../hooks/useProducts";
import { useSweetBox } from "../../hooks/useSweetBox";
import { useAuthContext } from "../../auth/context/AuthContext";
import GoogleLoginFallback from "../../auth/components/GoogleLoginFallback";
import EmptyCart from "../../components/cart/EmptyCart";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import { useAccountModal } from "../../context/AccountModalContext";
import { PendingAction } from "../../constants/PendingAction";
import Loading from "../../components/common/Loading";

function Cart() {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const { setPendingAction, openModal } = useAccountModal();
    const { products, loading: productsLoading } = useProducts();
    const { sweetBoxes, loading: sweetBoxesLoading } = useSweetBox();
    const { isLoggedIn } = useAuthContext();
    const [showGoogleLogin, setShowGoogleLogin] = useState(false);

    if (productsLoading || sweetBoxesLoading) {
        return <Loading />;
    }
    if (cartItems.length === 0) return <EmptyCart />;

    const grandTotal = cartItems.reduce((total, item) => {
        if (item.itemType === "PRODUCT") {
            const product = products.find(p => p.id === item.productId);
            if (!product || !item.weight) return total;
            const price = item.weight === "250g" ? product.price250g : item.weight === "500g" ? product.price500g : product.price1kg;
            return total + price * item.quantity;
        }

        if (item.itemType === "SWEET_BOX") {
            const sweetBox = sweetBoxes.find(box => box.id === item.sweetBoxId);
            if (!sweetBox) return total;
            return total + sweetBox.price * item.quantity;
        }

        return total;
    }, 0);

    const handleCheckout = () => {
        setPendingAction(PendingAction.CHECKOUT);
        if (isLoggedIn) {
            openModal();
            return;
        }
        setShowGoogleLogin(true);
    };

    if (showGoogleLogin) {
        return (
            <GoogleLoginFallback
                onSuccess={() => setShowGoogleLogin(false)}
                onClose={() => setShowGoogleLogin(false)}
                onError={message => console.error("Google login:", message)}
            />
        );
    }

    return (
        <section className={styles.page}>
            <div className={styles.container}>
                <div className={styles.items}>
                    {cartItems.map(item => {
                        if (item.itemType === "PRODUCT") {
                            const product = products.find(p => p.id === item.productId);
                            if (!product || !item.weight) return null;

                            const price = item.weight === "250g" ? product.price250g : item.weight === "500g" ? product.price500g : product.price1kg;

                            return (
                                <CartItem
                                    key={`${item.productId}-${item.weight}`}
                                    imageUrl={product.imageUrl}
                                    productName={product.name}
                                    weight={item.weight}
                                    price={price}
                                    quantity={item.quantity}
                                    subtotal={price * item.quantity}
                                    onIncrease={() => increaseQuantity(item)}
                                    onDecrease={() => decreaseQuantity(item)}
                                    onRemove={() => removeFromCart(item)}
                                />
                            );
                        }

                        if (item.itemType === "SWEET_BOX") {
                            const sweetBox = sweetBoxes.find(box => box.id === item.sweetBoxId);
                            if (!sweetBox) return null;

                            return (
                                <CartItem
                                    key={`sweetbox-${item.sweetBoxId}`}
                                    imageUrl={sweetBox.imageUrl}
                                    productName={sweetBox.name}
                                    weight={sweetBox.totalWeight}
                                    price={sweetBox.price}
                                    quantity={item.quantity}
                                    subtotal={sweetBox.price * item.quantity}
                                    onIncrease={() => increaseQuantity(item)}
                                    onDecrease={() => decreaseQuantity(item)}
                                    onRemove={() => removeFromCart(item)}
                                />
                            );
                        }

                        return null;
                    })}
                </div>

                <CartSummary total={grandTotal} onCheckout={handleCheckout} />
            </div>
        </section>
    );
}

export default Cart;