import { useState } from "react";

import { useCategories } from "../../hooks/useCategories";
import { useCreateProduct } from "../../hooks/useCreateProduct";

function ProductForm() {

    const { categories } = useCategories();

    const { saveProduct, loading } = useCreateProduct();

    const [form, setForm] = useState({

        name: "",

        description: "",

        imageUrl: "",

        price250g: 0,

        price500g: 0,

        price1kg: 0,

        currentStockKg: 0,

        lowStockAlertKg: 0,

        categoryId: 0,

    });

    const handleChange = (

        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >

    ) => {

        const { name, value } = event.target;

        setForm((previous) => ({

            ...previous,

            [name]:

                name === "name" ||
                name === "description" ||
                name === "imageUrl"

                    ? value

                    : Number(value),

        }));

    };

    const handleSubmit = async (

        event: React.FormEvent

    ) => {

        event.preventDefault();

        await saveProduct(form);

        alert("Product Created Successfully");

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Add Product</h2>

            <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
            />

            <input
                name="imageUrl"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
            />

            <select

                name="categoryId"

                value={form.categoryId}

                onChange={handleChange}

            >

                <option value={0}>

                    Select Category

                </option>

                {

                    categories.map((category) => (

                        <option

                            key={category.id}

                            value={category.id}

                        >

                            {category.name}

                        </option>

                    ))

                }

            </select>

            <input

                type="number"

                name="price250g"

                placeholder="250g Price"

                value={form.price250g}

                onChange={handleChange}

            />

            <input

                type="number"

                name="price500g"

                placeholder="500g Price"

                value={form.price500g}

                onChange={handleChange}

            />

            <input

                type="number"

                name="price1kg"

                placeholder="1kg Price"

                value={form.price1kg}

                onChange={handleChange}

            />

            <input

                type="number"

                name="currentStockKg"

                placeholder="Current Stock"

                value={form.currentStockKg}

                onChange={handleChange}

            />

            <input

                type="number"

                name="lowStockAlertKg"

                placeholder="Low Stock Alert"

                value={form.lowStockAlertKg}

                onChange={handleChange}

            />

            <button

                type="submit"

                disabled={loading}

            >

                {

                    loading

                        ? "Saving..."

                        : "Save Product"

                }

            </button>

        </form>

    );

}

export default ProductForm;