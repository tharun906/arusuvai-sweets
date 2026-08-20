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
import GoogleLoginFallback from "../../auth/components/GoogleLoginFallback";


function Checkout() {

    const navigate = useNavigate();


    const {
        customer,
        isLoggedIn,
        isGoogleUser
    } = useAuthContext();

    const [
        showGoogleLogin,
        setShowGoogleLogin
    ] = useState(false);

    console.log("AUTH:", {
        isLoggedIn,
        isGoogleUser,
        customer
    });


    const {
        openModal
    } = useAccountModal();


    const {
        cartItems,
        clearCart
    } = useCart();


    const {
        summary,
        deliveryStatus,
        loading,
        getCheckoutSummary,
        checkDelivery
    } = useCheckout();


    const {
        createOrder,
        loading: orderLoading
    } = useOrder();


    const {
        verifyPayment
    } = usePayment();


    const [
        paymentMethod,
        setPaymentMethod
    ] = useState<"COD" | "ONLINE">("ONLINE");


    /*
     * ========================================
     * NEW GOOGLE USER
     * ========================================
     *
     * Google authentication succeeded,
     * but Arusuvai customer profile does
     * not exist yet.
     *
     * Open the existing phone/profile flow.
     */

    useEffect(() => {

        /*
         * Completely logged-out user.
         *
         * Checkout must never open the
         * phone/profile modal directly.
         */
    
        if (
            !isLoggedIn &&
            !isGoogleUser
        ) {
    
            setShowGoogleLogin(true);
    
            return;
    
        }
    
    
        /*
         * Google authentication succeeded,
         * but profile is incomplete.
         *
         * Now the phone/profile modal is allowed.
         */
    
        if (
            isLoggedIn &&
            isGoogleUser &&
            !customer
        ) {
    
            openModal();
    
        }
    
    }, [
        isLoggedIn,
        isGoogleUser,
        customer
    ]);


    /*
     * ========================================
     * LOAD CHECKOUT DATA
     * ========================================
     */

    useEffect(() => {

        if (!customer) {

            return;

        }


        getCheckoutSummary({

            customerId:
                customer.id,

            items:
                cartItems

        });


        checkDelivery({

            latitude:
                customer.latitude,

            longitude:
                customer.longitude

        });

    }, [
        customer,
        cartItems
    ]);


    /*
     * ========================================
     * COD
     * ========================================
     */

    useEffect(() => {

        if (
            deliveryStatus?.codAvailable
        ) {

            setPaymentMethod(
                "COD"
            );

        }

    }, [
        deliveryStatus
    ]);


    /*
     * ========================================
     * PLACE ORDER
     * ========================================
     */

    const handlePlaceOrder =
        async () => {

            if (!customer) {

                return;

            }


            const response =
                await createOrder({

                    customerId:
                        customer.id,

                    paymentMethod,

                    items:
                        cartItems

                });


            /*
             * COD
             */

            if (
                !response.paymentRequired
            ) {

                clearCart();

                navigate(
                    ROUTES.ORDERS
                );

                return;

            }


            /*
             * ONLINE PAYMENT
             */

            openRazorpay(

                response.payment!,

                async paymentResponse => {

                    await verifyPayment({

                        orderId:
                            response.payment!.orderId,

                        razorpayOrderId:
                            paymentResponse.razorpay_order_id,

                        razorpayPaymentId:
                            paymentResponse.razorpay_payment_id,

                        razorpaySignature:
                            paymentResponse.razorpay_signature

                    });


                    clearCart();

                    navigate(
                        ROUTES.ORDERS
                    );

                }

            );

        };


    /*
     * ========================================
     * WAITING FOR GOOGLE PROFILE COMPLETION
     * ========================================
     *
     * Don't show checkout data yet.
     *
     * AccountModal will handle the
     * phone/profile completion.
     */

    if (
        isGoogleUser &&
        !customer
    ) {

        return (

            <section
                className={
                    styles.page
                }
            />

        );

    }


    /*
     * ========================================
     * SAFETY
     * ========================================
     *
     * If there is no authenticated customer,
     * don't allow checkout.
     */

    if (!customer) {

        return (

            <section
                className={
                    styles.page
                }
            />

        );

    }

    if (
        showGoogleLogin &&
        !isLoggedIn
    ) {
    
        return (
    
            <GoogleLoginFallback
    
                onSuccess={() => {
    
                    setShowGoogleLogin(false);
    
                }}
    
                onClose={() => {
    
                    setShowGoogleLogin(false);
    
                }}
    
                onError={message => {
    
                    console.error(
                        "Google login:",
                        message
                    );
    
                }}
    
            />
    
        );
    
    }


    if (loading) {

        return (
            <>Loading...</>
        );

    }


    if (
        !summary ||
        !deliveryStatus
    ) {

        return (
            <>No Checkout Data</>
        );

    }


    return (

        <section
            className={
                styles.page
            }
        >

            <div
                className={
                    styles.container
                }
            >

                <div
                    className={
                        styles.left
                    }
                >

                    <CheckoutItems
                        items={
                            summary.items
                        }
                    />


                    <DeliveryStatusCard

                        distance={
                            deliveryStatus.distance
                        }

                        message={
                            deliveryStatus.message
                        }

                        codAvailable={
                            deliveryStatus.codAvailable
                        }

                    />


                    <PaymentMethodCard

                        value={
                            paymentMethod
                        }

                        codAvailable={
                            deliveryStatus.codAvailable
                        }

                        onChange={
                            setPaymentMethod
                        }

                    />

                </div>


                <div
                    className={
                        styles.right
                    }
                >

                    <CheckoutSummaryCard

                        subtotal={
                            summary.subtotal
                        }

                        deliveryCharge={
                            summary.deliveryCharge
                        }

                        grandTotal={
                            summary.grandTotal
                        }

                        loading={
                            orderLoading
                        }

                        onPlaceOrder={
                            handlePlaceOrder
                        }

                    />

                </div>

            </div>

        </section>

    );

}


export default Checkout;