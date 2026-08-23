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

function Checkout() {
    const navigate = useNavigate();
    const { customer } = useAuthContext();
    const { phoneVerified } = useAccountModal();
    const { cartItems, clearCart } = useCart();
    const { summary, deliveryStatus, loading, getCheckoutSummary, checkDelivery } = useCheckout();
    const { createOrder, loading: orderLoading } = useOrder();
    const { verifyPayment } = usePayment();
    const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("ONLINE");

    /*
     * ========================================
     * LOAD CHECKOUT DATA
     * ========================================
     *
     * Checkout data is loaded only after
     * the account / phone / profile flow
     * has been successfully completed.
     */
    useEffect(() => {
        if (!customer || !phoneVerified) return;
        getCheckoutSummary({ customerId: customer.id, items: cartItems });
        checkDelivery({ latitude: customer.latitude, longitude: customer.longitude });
    }, [customer, cartItems, phoneVerified]);

    /*
     * ========================================
     * PAYMENT METHOD
     * ========================================
     */
    useEffect(() => {
        if (deliveryStatus?.codAvailable) {
            setPaymentMethod("COD");
        }
    }, [deliveryStatus]);

    /*
     * ========================================
     * PLACE ORDER
     * ========================================
     */
    const handlePlaceOrder = async () => {
        if (!customer) return;

        const response = await createOrder({
            customerId: customer.id,
            paymentMethod,
            items: cartItems
        });

        /*
         * COD
         */
        if (!response.paymentRequired) {
            clearCart();
            navigate(ROUTES.ORDERS);
            return;
        }

        /*
         * ONLINE PAYMENT
         */
        openRazorpay(response.payment!, async paymentResponse => {
            await verifyPayment({
                orderId: response.payment!.orderId,
                razorpayOrderId: paymentResponse.razorpay_order_id,
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                razorpaySignature: paymentResponse.razorpay_signature
            });

            clearCart();
            navigate(ROUTES.ORDERS);
        });
    };

    /*
     * ========================================
     * ACCOUNT / PHONE FLOW NOT COMPLETED
     * ========================================
     *
     * /checkout should only become usable
     * after the account flow is completed.
     */
    if (!customer || !phoneVerified) {
        return <section className={styles.page} />;
    }

    /*
     * ========================================
     * LOADING
     * ========================================
     */
    if (loading) {
        return <>Loading...</>;
    }

    /*
     * ========================================
     * CHECKOUT DATA NOT AVAILABLE
     * ========================================
     */
    if (!summary || !deliveryStatus) {
        return <>No Checkout Data</>;
    }

    /*
     * ========================================
     * CHECKOUT PAGE
     * ========================================
     */
    return (
        <section className={styles.page}>
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
                </div>
                <div className={styles.right}>
                    <CheckoutSummaryCard
                        subtotal={summary.subtotal}
                        deliveryCharge={summary.deliveryCharge}
                        grandTotal={summary.grandTotal}
                        loading={orderLoading}
                        onPlaceOrder={handlePlaceOrder}
                    />
                </div>
            </div>
        </section>
    );
}

export default Checkout;