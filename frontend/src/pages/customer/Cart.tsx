import { useCart } from "../../context/CartContext";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuthContext } from "../../auth/context/AuthContext";
import { useAccountModal } from "../../context/AccountModalContext";
import { PendingAction } from "../../constants/PendingAction";

function Cart() {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const { products, loading } = useProducts();
    const { isLoggedIn } = useAuthContext();
    const {  openModal, setPendingAction } = useAccountModal();
    const navigate = useNavigate();
    if (loading) { return <h2>Loading...</h2>; }

    const grandTotal = cartItems.reduce((total, item) => {
        const product = products.find(
            (p) => p.id === item.productId
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
    }, 0);

    const handleCheckout = () => {

        if (!isLoggedIn) {
    
            setPendingAction(
                PendingAction.CHECKOUT
            );
    
            openModal();
    
            return;
    
        }
    
        navigate(ROUTES.CHECKOUT);
    
    };

    return (
        <div>

            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ? (

                <p>Your cart is empty.</p>

            ) : (

                <>
                    {cartItems.map((item) => {

                        const product = products.find(
                            (p) => p.id === item.productId
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

                        const subtotal = price * item.quantity;

                        return (

                            <div
                                key={`${item.productId}-${item.weight}`}
                            >

                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    width={150}
                                />

                                <h2>{product.name}</h2>

                                <p>{product.description}</p>

                                <p>
                                    <strong>Weight:</strong> {item.weight}
                                </p>

                                <p>
                                    <strong>Price:</strong> ₹{price}
                                </p>

                                <p>
                                    <strong>Quantity:</strong> {item.quantity}
                                </p>

                                <button
                                    onClick={() =>
                                        increaseQuantity(
                                            item.productId,
                                            item.weight
                                        )
                                    }
                                >
                                    +
                                </button>

                                <button
                                    onClick={() =>
                                        decreaseQuantity(
                                            item.productId,
                                            item.weight
                                        )
                                    }
                                >
                                    -
                                </button>

                                <button
                                    onClick={() =>
                                        removeFromCart(
                                            item.productId,
                                            item.weight
                                        )
                                    }
                                >
                                    Remove
                                </button>

                                <p>
                                    <strong>Subtotal:</strong> ₹{subtotal}
                                </p>

                                <hr />

                            </div>

                        );

                    })}

                    <h2>Grand Total: ₹{grandTotal}</h2>

                    <button
    onClick={handleCheckout}
>
    Proceed To Checkout
</button>

                </>

            )}

        </div>
    );
}

export default Cart;