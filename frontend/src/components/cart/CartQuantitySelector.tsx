import styles from "./CartQuantitySelector.module.css";

interface CartQuantitySelectorProps {

    value: number;

    min?: number;

    max?: number;

    disabled?: boolean;

    onIncrease: () => void;

    onDecrease: () => void;

}

function CartQuantitySelector({

    value,

    min = 1,

    max = 99,

    disabled = false,

    onIncrease,

    onDecrease,

}: CartQuantitySelectorProps) {

    return (

        <div className={styles.cartQuantity}>

            <button

                type="button"

                disabled={disabled || value <= min}

                onClick={onDecrease}

            >

                −

            </button>

            <span>

                {value}

            </span>

            <button

                type="button"

                disabled={disabled || value >= max}

                onClick={onIncrease}

            >

                +

            </button>

        </div>

    );

}

export default CartQuantitySelector;