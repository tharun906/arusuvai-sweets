import { useEffect, useState } from "react";

import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../hooks/useCheckout";
import { useOrder } from "../../hooks/useOrder";
import { openRazorpay } from "../../utils/razorpay";
import { usePayment } from "../../hooks/usePayment";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuthContext } from "../../auth/context/AuthContext";

function Checkout() {

    const { cartItems, clearCart } = useCart();
    const { createOrder, loading: orderLoading } = useOrder();
    const { verifyPayment } = usePayment();
    const navigate = useNavigate();
    const { customer } = useAuthContext();

    const {

        summary,
    
        deliveryStatus,
    
        loading,
    
        getCheckoutSummary,
    
        checkDelivery
    
    } = useCheckout();

    const [paymentMethod, setPaymentMethod] = useState<
    "COD" | "ONLINE"
>(
    "ONLINE"
);

    const handlePlaceOrder = async () => {

        const payment = await createOrder({

            customerId: customer!.id,

            paymentMethod,

            items: cartItems

        });
    
        openRazorpay(payment, async (response) => {
    
            await verifyPayment({

                orderId: payment.orderId,
            
                razorpayOrderId: response.razorpay_order_id,
            
                razorpayPaymentId: response.razorpay_payment_id,
            
                razorpaySignature: response.razorpay_signature
            
            });
            
            clearCart();
            
            navigate(ROUTES.ORDERS);
    
        });
    
    };

    useEffect(() => {

        if (!customer) {
    
            return;
    
        }
    
        getCheckoutSummary({
    
            customerId: customer.id,
    
            items: cartItems
    
        });
    
        checkDelivery({
    
            latitude: customer.latitude,
    
            longitude: customer.longitude
    
        });
    
    }, [customer]);

    useEffect(() => {

        if (
    
            deliveryStatus?.codAvailable
    
        ) {
    
            setPaymentMethod("COD");
    
        }
    
    }, [deliveryStatus]);
    
    if (loading) {

        return <h2>Loading Checkout...</h2>;

    }

    if (!summary) {

        return <h2>No Checkout Data</h2>;

    }




    return (

        <div>
    
            <h1>Checkout Summary</h1>
    
            {summary.items.map((item) => (
    
                <div key={item.productId}>
    
                    <h3>{item.productName}</h3>
    
                    <p>Quantity : {item.quantity}</p>
    
                    <p>Unit Price : ₹{item.unitPrice}</p>
    
                    <p>Total : ₹{item.totalPrice}</p>
    
                    <hr />
    
                </div>
    
            ))}
    
            <h3>Subtotal : ₹{summary.subtotal}</h3>
    
            <h3>Delivery : ₹{summary.deliveryCharge}</h3>
    
            <h2>Grand Total : ₹{summary.grandTotal}</h2>
    
            <hr />
    
            <h2>Delivery Status</h2>
    
            {
    
                deliveryStatus && (
    
                    <>
    
                        <p>
    
                            <strong>Distance :</strong>{" "}
    
                            {deliveryStatus.distance.toFixed(2)} km
    
                        </p>
    
                        <p>{deliveryStatus.message}</p>
    
                    </>
    
                )
    
            }
    
            <hr />
    
            <h2>Select Payment Method</h2>
    
            {
    
                deliveryStatus?.codAvailable && (
    
                    <label>
    
                        <input
    
                            type="radio"
    
                            value="COD"
    
                            checked={paymentMethod === "COD"}
    
                            onChange={() =>
                                setPaymentMethod("COD")
                            }
    
                        />
    
                        Cash On Delivery
    
                    </label>
    
                )
    
            }
    
            <br />
    
            <label>
    
                <input
    
                    type="radio"
    
                    value="ONLINE"
    
                    checked={paymentMethod === "ONLINE"}
    
                    onChange={() =>
                        setPaymentMethod("ONLINE")
                    }
    
                />
    
                Online Payment
    
            </label>
    
            <br />
    
            <br />
    
            <button
    
                onClick={handlePlaceOrder}
    
                disabled={orderLoading}
    
            >
    
                {
    
                    orderLoading
    
                        ? "Processing..."
    
                        : "Place Order"
    
                }
    
            </button>
    
        </div>
    
    );
}

export default Checkout;