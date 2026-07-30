import type { Product } from "../../../types/Product";
import ProductCard from "./ProductCard/ProductCard";
import styles from "./ProductSection.module.css";

interface ProductSectionProps {
    products: Product[];
}

function ProductSection({ products }: ProductSectionProps) {

    return (
        <section className={styles.section}>

            <h2>Our Products</h2>

            <div className={styles.grid}>

                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </section>
    );
}

export default ProductSection;