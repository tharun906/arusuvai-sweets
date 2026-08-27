import Card from "../common/Card";
import Button from "../common/Button";
import Price from "../common/Price";

import styles from "./CartItem.module.css";
import CartQuantitySelector from "./CartQuantitySelector";

interface CartItemProps {

    imageUrl: string;

    productName: string;

    weight: string;

    price: number;

    quantity: number;

    subtotal: number;

    onIncrease: () => void;

    onDecrease: () => void;

    onRemove: () => void;

}

function CartItem({

    imageUrl,

    productName,

    weight,

    price,

    quantity,

    subtotal,

    onIncrease,

    onDecrease,

    onRemove,

}: CartItemProps) {

    return (

        <Card className={styles.card}>

            <img

                src={imageUrl}

                alt={productName}

                className={styles.image}

            />

            <div className={styles.details}>

                <h3>

                    {productName}

                </h3>

                <span className={styles.weight}>

                    {weight}

                </span>

                <Price

                    amount={price}

                    size="md"

                />

            </div>

            <div className={styles.actions}>

                <CartQuantitySelector
                    value={quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />

                <span className={styles.itemCount}>
                    {quantity} Items
                </span>

                <Price
                    amount={subtotal}
                    size="lg"
                />

                <Button
                    variant="danger"
                    onClick={onRemove}
                >
                    Remove
                </Button>

                </div>

        </Card>

    );

}

export default CartItem;