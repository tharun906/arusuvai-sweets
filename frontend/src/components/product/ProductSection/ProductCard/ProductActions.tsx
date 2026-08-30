import styles from "./ProductActions.module.css";
import Button from "../../../common/Button";
import WeightSelector from "../../../common/WeightSelector";
import QuantitySelector from "../../../common/QuantitySelector";
import type { ProductWeight } from "../../../../types/CartItem";

interface ProductActionsProps {
    selectedWeight: ProductWeight;
    quantity: number;
    disabled: boolean;
    buttonText: string;
    onWeightChange: (weight: ProductWeight) => void;
    onQuantityChange: (quantity: number) => void;
    onAddToCart: () => void;
}

function ProductActions({
    selectedWeight,
    quantity,
    disabled,
    buttonText,
    onWeightChange,
    onQuantityChange,
    onAddToCart,
}: ProductActionsProps) {
    return (
        <div className={styles.actions}>
            <WeightSelector
                value={selectedWeight}
                disabled={disabled}
                onChange={onWeightChange}
            />
            <QuantitySelector
                value={quantity}
                disabled={disabled}
                onChange={onQuantityChange}
            />
            <Button fullWidth disabled={disabled} onClick={onAddToCart}>
                {buttonText}
            </Button>
        </div>
    );
}

export default ProductActions;