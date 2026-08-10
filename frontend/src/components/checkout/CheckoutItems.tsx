import Card from "../common/Card";
import Price from "../common/Price";

import styles from "./CheckoutItems.module.css";

interface CheckoutItem {

    productId: number;

    productName: string;

    quantity: number;

    unitPrice: number;

    totalPrice: number;

}

interface CheckoutItemsProps {

    items: CheckoutItem[];

}

function CheckoutItems({

    items,

}: CheckoutItemsProps) {

    return (

        <Card className={styles.card}>

            <h2>

                Order Items

            </h2>

            <div className={styles.list}>

                {

                    items.map((item) => (

                        <div

                            key={item.productId}

                            className={styles.item}

                        >

                            <div className={styles.left}>

                                <h3>

                                    {item.productName}

                                </h3>

                                <p>

                                    Qty : {item.quantity}

                                </p>

                            </div>

                            <div className={styles.right}>

                                <Price

                                    amount={item.totalPrice}

                                    size="md"

                                />

                                <span>

                                    ₹{item.unitPrice} each

                                </span>

                            </div>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

}

export default CheckoutItems;