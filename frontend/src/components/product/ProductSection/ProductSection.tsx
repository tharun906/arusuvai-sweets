import Section from "../../common/Section";
import ProductCard from "./ProductCard/ProductCard";
import SweetBoxSection from "../SweetBoxSection/SweetBoxSection";

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

        <>

            {/* =========================
                DEFAULT SWEET BOXES
            ========================= */}

            <SweetBoxSection />


            {/* =========================
                BUILD YOUR OWN BOX
            ========================= */}

            <div
                id="products"
                className={styles.productsSection}
            >

                <Section

                    title="Build Your Own Box"

                    subtitle="Choose your favourite traditional sweets and create your own combination."

                >

                    {/* Categories */}

                    <div className={styles.categories}>

                        <Chip

                            active={
                                selectedCategoryId === null
                            }

                            onClick={() =>
                                onCategorySelect(null)
                            }

                        >
                            All

                        </Chip>


                        {categories.map(category => (

                            <Chip

                                key={category.id}

                                active={
                                    selectedCategoryId ===
                                    category.id
                                }

                                onClick={() =>
                                    onCategorySelect(
                                        category.id
                                    )
                                }

                            >

                                {category.name}

                            </Chip>

                        ))}

                    </div>


                    {/* Products */}

                    <div className={styles.grid}>

                        {products.map(product => (

                            <ProductCard

                                key={product.id}

                                product={product}

                            />

                        ))}

                    </div>

                </Section>

            </div>

        </>

    );
}

export default ProductSection;