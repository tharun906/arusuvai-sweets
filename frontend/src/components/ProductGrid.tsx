import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";
import './ProductCard.css';

interface ProductGridProps {
    products: Product[];
}

function ProductGrid({ products }: ProductGridProps) {
    return (
        
            <div >
                {products.map((singleProduct) => (
                    <ProductCard key={singleProduct.id} product={singleProduct} />
                ))}
            </div>
    );
}

export default ProductGrid;
