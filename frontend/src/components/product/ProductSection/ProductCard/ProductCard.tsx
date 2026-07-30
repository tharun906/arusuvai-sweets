import { useState } from "react";

import styles from "./ProductCard.module.css";
import type { Product } from "../../../../types/Product";
import type { ProductWeight } from "../../../../types/CartItem";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {

    const [selectedWeight, setSelectedWeight] =useState<ProductWeight>("250g");
    const [quantity, setQuantity] = useState(1);
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

    const handleAddToCart = () => {
        console.log({
            productId: product.id,
            weight: selectedWeight,
            quantity
        });
    };

    return (

        <div className={styles.card}>
            <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.image}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h4>Choose Weight</h4>
            <div className={styles.weightContainer}>
                <label>
                    <input
                        type="radio"
                        checked={selectedWeight === "250g"}
                        onChange={() => setSelectedWeight("250g")}
                    />
                    250g - ₹{product.price250g}

                </label>

                <label>

                    <input
                        type="radio"
                        checked={selectedWeight === "500g"}
                        onChange={() => setSelectedWeight("500g")}
                    />

                    500g - ₹{product.price500g}

                </label>

                <label>

                    <input
                        type="radio"
                        checked={selectedWeight === "1kg"}
                        onChange={() => setSelectedWeight("1kg")}
                    />

                    1 Kg - ₹{product.price1kg}

                </label>

            </div>

            <div className={styles.quantity}>

                <button
                    onClick={() =>
                        setQuantity((q) => Math.max(1, q - 1))
                    }
                >
                    -
                </button>

                <span>{quantity}</span>

                <button
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
            >
                Add To Cart
            </button>

        </div>

    );

}

export default ProductCard;