import type { Product } from "../types/Product";
import "./StatusCards.css";

interface StatsCardsProps {
  products: Product[];
}

function StatsCards({ products }: StatsCardsProps) {
  const totalProducts = products.length;

  const averagePrice =
    products.reduce((sum, product) => sum + product.price, 0) /
      products.length || 0;

  const averageRating =
    products.reduce((sum, product) => sum + product.rating.rate, 0) /
      products.length || 0;

  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;

  return (
    <div className="stats-cards">
      <div className="stats-card">
        <p className="stats-card-title">Total Products</p>
        <h2>{totalProducts}</h2>
      </div>


      <div className="stats-card">
        <p className="stats-card-title">Total Categories</p>
        <h2>{totalCategories}</h2>
      </div>

      <div className="stats-card">
        <p className="stats-card-title">Avg Price</p>
        <h2>${averagePrice.toFixed(2)}</h2>
      </div>

      <div className="stats-card">
        <p className="stats-card-title">Avg Rating</p>
        <h2>{averageRating.toFixed(1)}</h2>
      </div>
    </div>
  );
}

export default StatsCards;