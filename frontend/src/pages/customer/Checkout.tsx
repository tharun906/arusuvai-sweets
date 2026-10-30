import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";
import { ROUTES } from "../../constants/routes";
import { useAuthContext } from "../../auth/context/AuthContext";
import { useAccountModal } from "../../context/AccountModalContext";
import { useCart } from "../../context/CartContext";
import { useCheckout } from "../../hooks/useCheckout";
import { useOrder } from "../../hooks/useOrder";
import { usePayment } from "../../hooks/usePayment";
import { openRazorpay } from "../../utils/razorpay";
import CheckoutItems from "../../components/checkout/CheckoutItems";
import DeliveryStatusCard from "../../components/checkout/DeliveryStatusCard";
import PaymentMethodCard from "../../components/checkout/PaymentMethodCard";
import CheckoutSummaryCard from "../../components/checkout/CheckoutSummaryCard";
import axios from "axios";
import Loading from "../../components/common/Loading";
import OrderProcessingOverlay from "../../components/checkout/OrderProcessingOverlay";

function Checkout() {
    const navigate = useNavigate();
    const { customer } = useAuthContext();
    const { phoneVerified } = useAccountModal();
    const { cartItems, clearCart } = useCart();
    const { summary, deliveryStatus, loading, getCheckoutSummary, checkDelivery } = useCheckout();
    const { createOrder, loading: orderLoading } = useOrder();
    const { verifyPayment, loading: paymentLoading } = usePayment();
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("ONLINE");
    const [paymentMessage, setPaymentMessage] = useState("");
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {

        if (!customer || !phoneVerified || cartItems.length === 0) {
            return;
        }
    
        getCheckoutSummary({
            customerId: customer.id,
            items: cartItems
        });
    
        if (
            customer.latitude === null ||
            customer.longitude === null
        ) {
            return;
        }
    
        checkDelivery({
            latitude: customer.latitude,
            longitude: customer.longitude
        });
    
    }, [
        customer,
        cartItems,
        phoneVerified
    ]);

    useEffect(() => {
        if (deliveryStatus?.codAvailable) setPaymentMethod("COD");
    }, [deliveryStatus]);

    const handlePlaceOrder = async () => {
        if (placingOrder || orderLoading || paymentLoading || !customer || cartItems.length === 0) return;
        setPaymentMessage("");
        setPlacingOrder(true);

        try {
            const response = await createOrder({ customerId: customer.id, paymentMethod, items: cartItems });

            if (!response.paymentRequired) {
                clearCart();
                navigate(ROUTES.ORDERS);
                return;
            }

            if (!response.payment) {
                setPaymentMessage("Unable to start the payment. Please try again.");
                setPlacingOrder(false);
                return;
            }

            openRazorpay(response.payment, {
                onSuccess: async paymentResponse => {
                    try {
                        await verifyPayment({
                            orderId: response.payment!.orderId,
                            razorpayOrderId: paymentResponse.razorpay_order_id,
                            razorpayPaymentId: paymentResponse.razorpay_payment_id,
                            razorpaySignature: paymentResponse.razorpay_signature
                        });
                        clearCart();
                        navigate(ROUTES.ORDERS);
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        setPaymentMessage("Payment was received, but verification is still being completed. Please check your orders shortly.");
                    } finally {
                        setPlacingOrder(false);
                    }
                },
                onFailure: failureResponse => {
                    console.error("Razorpay payment failed:", failureResponse);
                    setPaymentMessage("Payment failed. Please try again.");
                    setPlacingOrder(false);
                },
                onClose: () => {
                    setPaymentMessage("Payment was not completed. You can try again.");
                    setPlacingOrder(false);
                }
            });
        } catch (error) {

            console.error("Order creation failed:", error);
        
            if (axios.isAxiosError(error)) {
        
                const message =
                    error.response?.data?.message;
        
                if (message) {
                    setPaymentMessage(message);
                } else {
                    setPaymentMessage(
                        "Unable to place the order. Please try again."
                    );
                }
        
            } else {
        
                setPaymentMessage(
                    "Unable to place the order. Please try again."
                );
            }
        
            setPlacingOrder(false);
        }
    };

    if (!customer || !phoneVerified) return <section className={styles.page} />;
    if (loading) {
        return <Loading />;
    }
    if (!summary || !deliveryStatus) return <>No Checkout Data</>;
    return (
        <section className={styles.page}>
            {paymentLoading && <OrderProcessingOverlay />}
            <div className={styles.container}>
                <div className={styles.left}>
                    <CheckoutItems items={summary.items} />
    
                    <DeliveryStatusCard
                        distance={deliveryStatus.distance}
                        message={deliveryStatus.message}
                        codAvailable={deliveryStatus.codAvailable}
                    />
    
                    <PaymentMethodCard
                        value={paymentMethod}
                        codAvailable={deliveryStatus.codAvailable}
                        onChange={setPaymentMethod}
                    />
    
                    <div className={styles.billInfo}>
                        🧾 <strong>Bill:</strong> Your bill will be attached to the sweet box at the time of delivery.
                    </div>
    
                    {paymentMessage && (
                        <div
                            role="alert"
                            style={{
                                marginTop: "16px",
                                padding: "12px 16px",
                                borderRadius: "8px",
                                background: "var(--error-background)",
                                color: "var(--error-color)",
                                fontSize: "0.85rem"
                            }}
                        >
                            {paymentMessage}
                        </div>
                    )}
                </div>
    
                <div className={styles.right}>
                    <CheckoutSummaryCard
                        subtotal={summary.subtotal}
                        deliveryCharge={summary.deliveryCharge}
                        grandTotal={summary.grandTotal}
                        loading={
                            placingOrder ||
                            orderLoading ||
                            paymentLoading
                        }
                        onPlaceOrder={handlePlaceOrder}
                    />
                </div>
            </div>
        </section>
    );
}

export default Checkout;