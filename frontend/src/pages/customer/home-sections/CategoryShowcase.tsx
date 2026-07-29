import { useCategories } from '../../../hooks/useCategories';
import CategoryCard from '../../../components/category/CategoryCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import ErrorMessage from '../../../components/common/ErrorMessage';
import EmptyState from '../../../components/common/EmptyState';
import './CategoryShowcase.css';

function CategoryShowcase() {
  const { categories, loading, error, refetch } = useCategories();

  return (
    <section id="categories" className="section category-showcase">
      <div className="container">
        <span className="eyebrow">Our Sweets</span>
        <h2 className="category-showcase-title">Shop by Category</h2>

        {loading && <LoadingSpinner label="Loading categories" />}

        {!loading && error && <ErrorMessage message={error} onRetry={refetch} />}

        {!loading && !error && categories.length === 0 && (
          <EmptyState
            title="No categories available yet"
            message="Please check back soon — we're preparing fresh options."
          />
        )}

        {!loading && !error && categories.length > 0 && (
          <div className="category-showcase-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoryShowcase;