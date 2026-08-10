import Card from "../common/Card";
import Button from "../common/Button";
import Price from "../common/Price";

import styles from "./CheckoutSummaryCard.module.css";

interface CheckoutSummaryCardProps {

    subtotal: number;

    deliveryCharge: number;

    grandTotal: number;

    loading: boolean;

    onPlaceOrder: () => void;

}

function CheckoutSummaryCard({

    subtotal,

    deliveryCharge,

    grandTotal,

    loading,

    onPlaceOrder,

}: CheckoutSummaryCardProps) {

    return (

        <Card className={styles.card}>

            <h2>

                Order Summary

            </h2>

            <div className={styles.row}>

                <span>

                    Subtotal

                </span>

                <Price

                    amount={subtotal}

                    size="md"

                />

            </div>

            <div className={styles.row}>

                <span>

                    Delivery

                </span>

                <Price

                    amount={deliveryCharge}

                    size="md"

                />

            </div>

            <div className={styles.total}>

                <span>

                    Grand Total

                </span>

                <Price

                    amount={grandTotal}

                    size="lg"

                />

            </div>

            <Button

                fullWidth

                onClick={onPlaceOrder}

                disabled={loading}

            >

                {

                    loading

                        ? "Processing..."

                        : "Place Order"

                }

            </Button>

        </Card>

    );

}

export default CheckoutSummaryCard;