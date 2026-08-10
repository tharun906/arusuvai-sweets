import styles from "./ProductImage.module.css";

import StatusBadge from "../../../common/StatusBadge";

interface ProductImageProps {

    imageUrl: string;

    productName: string;

    status:
        | "AVAILABLE"
        | "LOW_STOCK"
        | "OUT_OF_STOCK"
        | "UNAVAILABLE";

}

function ProductImage({

    imageUrl,

    productName,

    status,

}: ProductImageProps) {

    return (

        <div className={styles.imageContainer}>

            <img

                src={imageUrl}

                alt={productName}

                className={styles.image}

            />

            <div className={styles.badge}>

                <StatusBadge

                    status={status}

                />

            </div>

        </div>

    );

}

export default ProductImage;