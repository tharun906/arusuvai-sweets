

import styles from "./Checkout.module.css";

import type { CheckoutItem } from "../../types/CheckoutItem";
import Card from "../../components/common/Card";
import Price from "../../components/common/Price";

interface CheckoutItemsProps {
    items: CheckoutItem[];
}

function CheckoutItems({ items }: CheckoutItemsProps) {

    return (

        <Card className={styles.card}>

            <h2>
                Order Items
            </h2>

            <div className={styles.list}>

                {items.map((item, index) => (

                    <div
                        key={
                            item.itemType === "PRODUCT"
                                ? `${item.productId}-${item.weight}`
                                : `sweetbox-${item.sweetBoxId}-${index}`
                        }
                        className={styles.item}
                    >

                        <div className={styles.left}>

                            <h3>
                                {item.itemType === "PRODUCT"
                                    ? item.productName
                                    : item.sweetBoxName}
                            </h3>

                            <p>
                                {item.weight}
                            </p>

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

                ))}

            </div>

        </Card>
    );
}

export default CheckoutItems;