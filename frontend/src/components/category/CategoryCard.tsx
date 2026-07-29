import { Link } from 'react-router-dom';
import type { Category } from '../../types/category.types';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.id}`} className="category-card">
      <span className="category-card-arch" aria-hidden="true">
        {category.name.charAt(0)}
      </span>
      <span className="category-card-name">{category.name}</span>
    </Link>
  );
}

export default CategoryCard;