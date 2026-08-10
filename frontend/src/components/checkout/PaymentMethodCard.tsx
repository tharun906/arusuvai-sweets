import Card from "../common/Card";

import styles from "./PaymentMethodCard.module.css";

interface PaymentMethodCardProps {

    value: "COD" | "ONLINE";

    codAvailable: boolean;

    onChange: (
        value: "COD" | "ONLINE"
    ) => void;

}

function PaymentMethodCard({

    value,

    codAvailable,

    onChange,

}: PaymentMethodCardProps) {

    return (

        <Card className={styles.card}>

            <h2>

                Payment Method

            </h2>

            <div className={styles.options}>

                {

                    codAvailable && (

                        <button

                            type="button"

                            className={`${styles.option} ${
                                value === "COD"
                                    ? styles.active
                                    : ""
                            }`}

                            onClick={() =>
                                onChange("COD")
                            }

                        >

                            <span className={styles.icon}>

                                💵

                            </span>

                            <div>

                                <h3>

                                    Cash On Delivery

                                </h3>

                                <p>

                                    Pay after delivery

                                </p>

                            </div>

                        </button>

                    )

                }

                <button

                    type="button"

                    className={`${styles.option} ${
                        value === "ONLINE"
                            ? styles.active
                            : ""
                    }`}

                    onClick={() =>
                        onChange("ONLINE")
                    }

                >

                    <span className={styles.icon}>

                        💳

                    </span>

                    <div>

                        <h3>

                            Online Payment

                        </h3>

                        <p>

                            Razorpay Secure Checkout

                        </p>

                    </div>

                </button>

            </div>

        </Card>

    );

}

export default PaymentMethodCard;