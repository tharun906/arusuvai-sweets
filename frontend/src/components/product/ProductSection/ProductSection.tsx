import { useEffect, useRef, useState } from "react";

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

    const productSectionRef =
        useRef<HTMLDivElement | null>(null);

    const [festiveActive, setFestiveActive] =
        useState(false);


    /*
     * ========================================
     * FESTIVE ANIMATION
     * ========================================
     *
     * Runs when the Product Section
     * enters the viewport.
     */

    useEffect(() => {

        const section =
            productSectionRef.current;

        if (!section) return;

        const observer =
            new IntersectionObserver(
                ([entry]) => {

                    if (entry.isIntersecting) {

                        setFestiveActive(true);

                        setTimeout(() => {
                            setFestiveActive(false);
                        }, 2400);

                    }

                },
                {
                    threshold: 0.25,
                }
            );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };

    }, []);


    /*
     * ========================================
     * CATEGORY CHANGE ANIMATION
     * ========================================
     */

    const triggerFestiveAnimation = () => {

        setFestiveActive(false);

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                setFestiveActive(true);

                setTimeout(() => {
                    setFestiveActive(false);
                }, 2400);

            });

        });

    };


    const handleCategorySelect =
        (id: number | null) => {

            onCategorySelect(id);

            triggerFestiveAnimation();

        };


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
                ref={productSectionRef}
                className={styles.productsSection}
            >

                <Section

                    title="Build Your Own Box"

                    subtitle="Choose your favourite traditional sweets and create your own combination."

                >

                    {/* =========================
                        CATEGORIES
                    ========================= */}

                    <div className={styles.categories}>

                        <Chip

                            active={
                                selectedCategoryId === null
                            }

                            onClick={() =>
                                handleCategorySelect(null)
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
                                    handleCategorySelect(
                                        category.id
                                    )
                                }

                            >

                                {category.name}

                            </Chip>

                        ))}

                    </div>


                    {/* =========================
                        PRODUCTS
                    ========================= */}

                    <div className={styles.grid}>

                        {products.map(product => (

                            <ProductCard

                                key={product.id}

                                product={product}

                                festiveActive={
                                    festiveActive
                                }

                            />

                        ))}

                    </div>

                </Section>

            </div>

        </>

    );
}

export default ProductSection;