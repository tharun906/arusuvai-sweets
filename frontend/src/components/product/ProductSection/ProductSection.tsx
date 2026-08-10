import Section from "../../common/Section";
import ProductCard from "./ProductCard/ProductCard";

import styles from "./ProductSection.module.css";

import type { Product } from "../../../types/Product";
import type { Category } from "../../../types/category";
import Chip from "../../common/Chip";

interface ProductSectionProps {

    products: Product[];

    categories: Category[];

    selectedCategoryId: number | null;

    onCategorySelect: (id: number | null) => void;

}

function ProductSection({
    products,
    categories,
    selectedCategoryId,
    onCategorySelect,
}: ProductSectionProps) {

    return (

<div id="products">
        <Section
            title="Our Products"
            subtitle="Freshly prepared traditional sweets crafted with authentic recipes and premium ingredients."
        >

            <div className={styles.categories}>

                <Chip
                    active={selectedCategoryId === null}
                    onClick={() => onCategorySelect(null)}
                >
                    All
                </Chip>

                {categories.map((category) => (

                    <Chip
                        key={category.id}
                        active={selectedCategoryId === category.id}
                        onClick={() =>
                            onCategorySelect(category.id)
                        }
                    >
                        {category.name}
                    </Chip>

                ))}

            </div>

            <div className={styles.grid}>

                {products.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </Section>
    </div>
    );

}

export default ProductSection;