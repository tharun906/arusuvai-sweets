import { useState } from "react";
import HeroBanner from "../../components/home/HeroBanner/HeroBanner";
import FeatureHighlights from "../../components/home/FeatureHighlights/FeatureHighlights";
import CategorySection from "../../components/category/CategorySection/CategorySection";
import ProductSection from "../../components/product/ProductSection/ProductSection";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";


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

    if (categoryLoading || productLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <HeroBanner />

            <FeatureHighlights />

            <CategorySection
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onCategorySelect={setSelectedCategoryId}
            />

            <ProductSection
                products={filteredProducts}
            />
        </>
    );
}

export default Home;