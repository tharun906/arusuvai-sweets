import { useState } from "react";
import HeroBanner from "../../components/home/HeroBanner/HeroBanner";
import ProductSection from "../../components/product/ProductSection/ProductSection";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import Gallery from "../../components/home/Gallery/ Gallery";
import BrandCarousel from "../../components/home/BrandCarousel/BrandCarousel";


function Home() {
    const { categories, loading: categoryLoading } = useCategories();
    const { products, loading: productLoading } = useProducts();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const filteredProducts =
        selectedCategoryId === null
            ? products
            : products.filter(
                  (product) => product.categoryId === selectedCategoryId
              );

    if (categoryLoading || productLoading) {return <h2>Loading...</h2>;}

    return (
        <>
            <HeroBanner />
    
            <BrandCarousel />
    
            <ProductSection
                products={filteredProducts}
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onCategorySelect={setSelectedCategoryId}
            />
    
            <Gallery />
        </>
    );
}

export default Home;