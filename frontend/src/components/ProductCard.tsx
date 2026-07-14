import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Product } from "../types/Product";
import "./ProductCard.css";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

interface ProductCardProps {
    product: Product;
}

function  ProductCard({product} : ProductCardProps) {
    return (

            <div className="product-card">
                <div className="product-card-image">
                    <p className="product-card-category">{product.category}</p>
                    <img src={product.image} alt={product.title} width="150"/>
                    <FontAwesomeIcon icon={faEllipsis} style={{color: "rgb(177, 177, 177)",}} />
                </div>
                <h3 className="product-title">{product.title}</h3>
                <div className="product-card-footer">
                    <div>
                        <p className="price-font">${product.price}</p>
                        <p className="rating-font">Rating: {product.rating.rate} ({product.rating.count})</p>
                    </div>
                    <div className="view-button-div">View</div>
                </div>
            </div>
    );
}

export default ProductCard;