import styles from "./ProductInfo.module.css";
import Price from "../../../common/Price";

interface ProductInfoProps {
    productName: string;
    price: number;
}

function ProductInfo({ productName, price }: ProductInfoProps) {
    return (
        <div className={styles.info}>
            <h3 className={styles.title}>{productName}</h3>
            <div className={styles.priceContainer}>
                <Price amount={price} size="lg" />
            </div>
        </div>
    );
}

export default ProductInfo;