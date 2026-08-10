import type { Category } from "../../../types/category";
import Chip from "../../common/Chip";

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

        <section className={styles.section}>

            <h2 className={styles.title}>

                Shop By Category

            </h2>

            <div className={styles.chips}>

                <Chip

                    active={selectedCategoryId === null}

                    onClick={() => onCategorySelect(null)}

                >

                    All

                </Chip>

                {

                    categories.map((category) => (

                        <Chip

                            key={category.id}

                            active={

                                selectedCategoryId === category.id

                            }

                            onClick={() =>

                                onCategorySelect(category.id)

                            }

                        >

                            {category.name}

                        </Chip>

                    ))

                }

            </div>

        </section>

    );

}

export default CategorySection;