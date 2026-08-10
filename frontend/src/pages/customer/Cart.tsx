import styles from "./cart.module.css";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { PendingAction } from "../../constants/PendingAction";

import { useCart } from "../../context/CartContext";
import { useProducts } from "../../hooks/useProducts";

import { useAuthContext } from "../../auth/context/AuthContext";
import { useAccountModal } from "../../context/AccountModalContext";

import EmptyCart from "../../components/cart/EmptyCart";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

function Cart() {

    const {

        cartItems,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

    } = useCart();

    const {

        products,

        loading,

    } = useProducts();

    const {

        isLoggedIn,

    } = useAuthContext();

    const {

        openModal,

        setPendingAction,

    } = useAccountModal();

    const navigate = useNavigate();

    if (loading) {

        return <>Loading...</>;

    }

    if (cartItems.length === 0) {

        return <EmptyCart />;

    }

    const grandTotal = cartItems.reduce(

        (total, item) => {

            const product = products.find(

                p => p.id === item.productId

            );

            if (!product) {

                return total;

            }

            const price =

                item.weight === "250g"

                    ? product.price250g

                    : item.weight === "500g"

                        ? product.price500g

                        : product.price1kg;

            return total + price * item.quantity;

        },

        0

    );

    const handleCheckout = () => {

        if (!isLoggedIn) {

            setPendingAction(

                PendingAction.CHECKOUT

            );

            openModal();

            return;

        }

        navigate(

            ROUTES.CHECKOUT

        );

    };

    return (

        <section className={styles.page}>

            <div className={styles.container}>

                <div className={styles.items}>

                    {

                        cartItems.map(item => {

                            const product = products.find(

                                p => p.id === item.productId

                            );

                            if (!product) {

                                return null;

                            }

                            const price =

                                item.weight === "250g"

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

                                    onIncrease={() =>

                                        increaseQuantity(

                                            item.productId,

                                            item.weight

                                        )

                                    }

                                    onDecrease={() =>

                                        decreaseQuantity(

                                            item.productId,

                                            item.weight

                                        )

                                    }

                                    onRemove={() =>

                                        removeFromCart(

                                            item.productId,

                                            item.weight

                                        )

                                    }

                                />

                            );

                        })

                    }

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