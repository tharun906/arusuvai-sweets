import Card from "../common/Card";
import Button from "../common/Button";
import Price from "../common/Price";

import styles from "./CartSummary.module.css";

interface CartSummaryProps {

    total: number;

    onCheckout: () => void;

}

function CartSummary({

    total,

    onCheckout,

}: CartSummaryProps) {

    return (

        <Card className={styles.summary}>

            <div className={styles.header}>

                <h2>

                    Order Summary

                </h2>

            </div>

            <div className={styles.row}>

                <span>

                    Grand Total

                </span>

                <Price

                    amount={total}

                    size="lg"

                />

            </div>

            <Button

                fullWidth

                onClick={onCheckout}

            >

                Proceed To Checkout

            </Button>

        </Card>

    );

}

export default CartSummary;