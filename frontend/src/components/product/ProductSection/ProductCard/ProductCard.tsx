import { useState } from "react";

import Card from "../../../common/Card";

import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";

import styles from "./ProductCard.module.css";

import { useCart } from "../../../../context/CartContext";

import type { Product } from "../../../../types/Product";
import type { ProductWeight } from "../../../../types/CartItem";

interface ProductCardProps {
    product: Product;
    festiveActive?: boolean;
}

function ProductCard({
    product,
    festiveActive = false,
}: ProductCardProps) {

    const { addToCart } = useCart();

    const [selectedWeight, setSelectedWeight] =
        useState<ProductWeight>("250g");

    const [quantity, setQuantity] =
        useState(1);

    const isUnavailable = !product.active;

    const isOutOfStock =
        product.currentStockKg <= 0;

    const isDisabled =
        isUnavailable || isOutOfStock;

    const isLowStock =
        !isDisabled &&
        product.currentStockKg <= product.lowStockAlertKg;

    const getStatus = () => {

        if (isUnavailable) {
            return "UNAVAILABLE";
        }

        if (isOutOfStock) {
            return "OUT_OF_STOCK";
        }

        if (isLowStock) {
            return "LOW_STOCK";
        }

        return "AVAILABLE";
    };

    const getPrice = () => {

        switch (selectedWeight) {

            case "250g":
                return product.price250g;

            case "500g":
                return product.price500g;

            case "1kg":
                return product.price1kg;

            default:
                return product.price250g;
        }
    };

    const handleAddToCart = () => {

        if (isDisabled) {
            return;
        }

        addToCart({
            itemType: "PRODUCT",
            productId: product.id,
            weight: selectedWeight,
            quantity,
        });
    };

    return (

        <Card
            className={`${styles.card} ${
                festiveActive ? styles.festiveActive : ""
            }`}
        >

            {/* FESTIVE SPRINKLES */}

            {festiveActive && (
                <div
                    className={styles.sprinkles}
                    aria-hidden="true"
                >
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                    <span className={styles.sprinkle}></span>
                </div>
            )}

            <div className={styles.cardContent}>

                <ProductImage
                    imageUrl={product.imageUrl}
                    productName={product.name}
                    status={getStatus()}
                />

                <ProductInfo
                    productName={product.name}
                    price={getPrice()}
                />

                <ProductActions
                    selectedWeight={selectedWeight}
                    quantity={quantity}
                    disabled={isDisabled}
                    buttonText={
                        isUnavailable
                            ? "Unavailable"
                            : isOutOfStock
                                ? "Out Of Stock"
                                : "Add To Cart"
                    }
                    onWeightChange={setSelectedWeight}
                    onQuantityChange={setQuantity}
                    onAddToCart={handleAddToCart}
                />

            </div>

        </Card>
    );
}

export default ProductCard;