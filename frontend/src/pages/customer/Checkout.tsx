import { useEffect } from "react";

import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../hooks/useCheckout";
import { useOrder } from "../../hooks/useOrder";
import { openRazorpay } from "../../utils/razorpay";
import { usePayment } from "../../hooks/usePayment";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

function Checkout() {

    const { cartItems, clearCart } = useCart();
    const { createOrder, loading: orderLoading } = useOrder();
    const { verifyPayment } = usePayment();
    const navigate = useNavigate();

    const {
        summary,
        loading,
        getCheckoutSummary
    } = useCheckout();

    const handlePayNow = async () => {

        const payment = await createOrder({
    
            customerId: 1,
    
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

        getCheckoutSummary({

            customerId: 1,

            items: cartItems

        });

    }, []);

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
    
            <button
                onClick={handlePayNow}
                disabled={orderLoading}
            >
                {orderLoading ? "Creating Order..." : "Pay Now"}
            </button>
    
        </div>
    
    );
}

export default Checkout;