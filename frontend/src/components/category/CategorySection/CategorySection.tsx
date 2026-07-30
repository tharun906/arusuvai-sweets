import type { Category } from "../../../types/category";
import styles from "./CategorySection.module.css";

interface CategorySectionProps {
    categories: Category[];
    selectedCategoryId: number | null;
    onCategorySelect: (id: number | null) => void;
}

function CategorySection({
    categories,
    selectedCategoryId,
    onCategorySelect,
}: CategorySectionProps) {

    return (
        <section className={styles.categorySection}>

            <h2>Shop By Category</h2>

            <div className={styles.categoryContainer}>

                <button
                    className={
                        selectedCategoryId === null
                            ? styles.active
                            : styles.categoryButton
                    }
                    onClick={() => onCategorySelect(null)}
                >
                    All
                </button>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={
                            selectedCategoryId === category.id
                                ? styles.active
                                : styles.categoryButton
                        }
                        onClick={() => onCategorySelect(category.id)}
                    >
                        {category.name}
                    </button>
                ))}

            </div>

        </section>
    );
}

export default CategorySection;