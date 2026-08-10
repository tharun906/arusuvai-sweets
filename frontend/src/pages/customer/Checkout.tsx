import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Checkout.module.css";

import { ROUTES } from "../../constants/routes";

import { PendingAction } from "../../constants/PendingAction";

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

    const { cartItems, clearCart } = useCart();

    const {

        summary,

        deliveryStatus,

        loading,

        getCheckoutSummary,

        checkDelivery,

    } = useCheckout();

    const {

        createOrder,

        loading: orderLoading,

    } = useOrder();

    const {

        verifyPayment,

    } = usePayment();

    const [

        paymentMethod,

        setPaymentMethod,

    ] = useState<"COD" | "ONLINE">("ONLINE");

    useEffect(() => {

        if (!customer) {

            return;

        }

        getCheckoutSummary({

            customerId: customer.id,

            items: cartItems,

        });

        checkDelivery({

            latitude: customer.latitude,

            longitude: customer.longitude,

        });

    }, [customer]);

    useEffect(() => {

        if (

            deliveryStatus?.codAvailable

        ) {

            setPaymentMethod("COD");

        }

    }, [deliveryStatus]);

    const handlePlaceOrder = async () => {

        const response = await createOrder({

            customerId: customer!.id,

            paymentMethod,

            items: cartItems,

        });

        if (!response.paymentRequired) {

            clearCart();

            navigate(ROUTES.ORDERS);

            return;

        }

        openRazorpay(

            response.payment!,

            async (paymentResponse) => {

                await verifyPayment({

                    orderId:

                        response.payment!.orderId,

                    razorpayOrderId:

                        paymentResponse.razorpay_order_id,

                    razorpayPaymentId:

                        paymentResponse.razorpay_payment_id,

                    razorpaySignature:

                        paymentResponse.razorpay_signature,

                });

                clearCart();

                navigate(

                    ROUTES.ORDERS

                );

            }

        );

    };

    if (loading) {

        return <>Loading...</>;

    }

    if (!summary || !deliveryStatus) {

        return <>No Checkout Data</>;

    }

    return (

        <section className={styles.page}>

            <div className={styles.container}>

                <div className={styles.left}>

                    <CheckoutItems

                        items={summary.items}

                    />

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