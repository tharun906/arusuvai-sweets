import { useState } from "react";

import styles from "./ProductCard.module.css";
import type { Product } from "../../../../types/Product";
import type { ProductWeight } from "../../../../types/CartItem";
import { useCart } from "../../../../context/CartContext";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {

    const { addToCart } = useCart();

    const [selectedWeight, setSelectedWeight] =
        useState<ProductWeight>("250g");

    const [quantity, setQuantity] = useState(1);

    const isUnavailable = !product.active;

    const isOutOfStock =
        product.currentStockKg <= 0;

    const isDisabled =
        isUnavailable || isOutOfStock;

    const isLowStock =
        !isDisabled &&
        product.currentStockKg <= product.lowStockAlertKg;

    const handleAddToCart = () => {

        if (isDisabled) {

            return;

        }

        addToCart({

            productId: product.id,

            weight: selectedWeight,

            quantity,

        });

    };

    const getSelectedPrice = () => {

        switch (selectedWeight) {

            case "250g":
                return product.price250g;

            case "500g":
                return product.price500g;

            case "1kg":
                return product.price1kg;

        }

    };

    return (

        <div
            className={`${styles.card} ${
                isDisabled
                    ? styles.outOfStockCard
                    : ""
            }`}
        >

            <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.image}
            />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            {

                isUnavailable ? (

                    <p className={styles.outOfStock}>

                        🚫 Unavailable

                    </p>

                ) : isOutOfStock ? (

                    <p className={styles.outOfStock}>

                        ❌ Out of Stock

                    </p>

                ) : isLowStock ? (

                    <p className={styles.lowStock}>

                        ⚠️ Only {product.currentStockKg} kg left

                    </p>

                ) : (

                    <p className={styles.available}>

                        ✅ Available

                    </p>

                )

            }

            <h4>Choose Weight</h4>

            <div className={styles.weightContainer}>

                <label>

                    <input
                        type="radio"
                        checked={selectedWeight === "250g"}
                        onChange={() =>
                            setSelectedWeight("250g")
                        }
                        disabled={isDisabled}
                    />

                    250g - ₹{product.price250g}

                </label>

                <label>

                    <input
                        type="radio"
                        checked={selectedWeight === "500g"}
                        onChange={() =>
                            setSelectedWeight("500g")
                        }
                        disabled={isDisabled}
                    />

                    500g - ₹{product.price500g}

                </label>

                <label>

                    <input
                        type="radio"
                        checked={selectedWeight === "1kg"}
                        onChange={() =>
                            setSelectedWeight("1kg")
                        }
                        disabled={isDisabled}
                    />

                    1 Kg - ₹{product.price1kg}

                </label>

            </div>

            <div className={styles.quantity}>

                <button
                    disabled={isDisabled}
                    onClick={() =>
                        setQuantity((q) =>
                            Math.max(1, q - 1)
                        )
                    }
                >
                    -
                </button>

                <span>{quantity}</span>

                <button
                    disabled={isDisabled}
                    onClick={() =>
                        setQuantity((q) => q + 1)
                    }
                >
                    +
                </button>

            </div>

            <h3>

                ₹{getSelectedPrice()}

            </h3>

            <button
                className={styles.cartButton}
                onClick={handleAddToCart}
                disabled={isDisabled}
            >

                {

                    isUnavailable

                        ? "Unavailable"

                        : isOutOfStock

                            ? "Out of Stock"

                            : "Add To Cart"

                }

            </button>

        </div>

    );

}

export default ProductCard;