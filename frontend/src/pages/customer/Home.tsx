import { useState } from "react";

import HeroBanner from "../../components/home/HeroBanner/HeroBanner";
import BrandCarousel from "../../components/home/BrandCarousel/BrandCarousel";
import Gallery from "../../components/home/Gallery/ Gallery";

import SweetTypeChoice from "../../components/product/SweetTypeChoice/SweetTypeChoice";
import ProductSection from "../../components/product/ProductSection/ProductSection";

import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

import Loading from "../../components/common/Loading";


function Home() {

    const {
        categories,
        loading: categoryLoading
    } = useCategories();

    const {
        products,
        loading: productLoading
    } = useProducts();

    const [
        selectedCategoryId,
        setSelectedCategoryId
    ] = useState<number | null>(null);


    const filteredProducts =
        selectedCategoryId === null
            ? products
            : products.filter(
                product =>
                    product.categoryId ===
                    selectedCategoryId
            );


    /*
     * Show the Arusuvai loading screen
     * while the main Home data is loading.
     */
    if (categoryLoading || productLoading) {

        return <Loading />;

    }


    return (

        <>

            {/* Hero */}

            <HeroBanner />


            {/* Sweet type choice
                MUST appear above carousel */}

            <SweetTypeChoice />


            {/* Existing big image carousel */}

            <BrandCarousel />


            {/* Default Sweet Boxes + Individual Products */}

            <ProductSection

                products={filteredProducts}

                categories={categories}

                selectedCategoryId={
                    selectedCategoryId
                }

                onCategorySelect={
                    setSelectedCategoryId
                }

            />


            {/* Gallery */}

            <Gallery />

        </>

    );
}

export default Home;