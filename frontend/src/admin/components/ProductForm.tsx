import { useEffect, useState } from "react";

import { useCategories } from "../../hooks/useCategories";

import type { ProductRequest } from "../../types/ProductRequest";
import type { ProductFormProps } from "../types/ProductFormProps";

import "../styles/ProductForm.css";

function ProductForm({

    initialValues,

    buttonText,

    loading,

    onSubmit,

}: ProductFormProps) {

    const { categories } = useCategories();

    const [form, setForm] =
        useState<ProductRequest>(initialValues);

    const [nameError, setNameError] =
        useState("");

    const [categoryError, setCategoryError] =
        useState("");

    const [imageUrlError, setImageUrlError] =
        useState("");

    const [price250Error, setPrice250Error] =
        useState("");

    const [price500Error, setPrice500Error] =
        useState("");

    const [price1kgError, setPrice1kgError] =
        useState("");

    const [stockError, setStockError] =
        useState("");

    const [lowStockError, setLowStockError] =
        useState("");

    useEffect(() => {

        setForm(initialValues);

    }, [initialValues]);

    const handleChange = (

        event: React.ChangeEvent<

            HTMLInputElement |

            HTMLTextAreaElement |

            HTMLSelectElement

        >

    ) => {

        const { name, value } = event.target;

        switch (name) {

            case "name":
                setNameError("");
                break;

            case "categoryId":
                setCategoryError("");
                break;

            case "imageUrl":
                setImageUrlError("");
                break;

            case "price250g":
                setPrice250Error("");
                break;

            case "price500g":
                setPrice500Error("");
                break;

            case "price1kg":
                setPrice1kgError("");
                break;

            case "currentStockKg":
                setStockError("");
                break;

            case "lowStockAlertKg":
                setLowStockError("");
                break;

        }

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

        setNameError("");
        setCategoryError("");
        setImageUrlError("");
        setPrice250Error("");
        setPrice500Error("");
        setPrice1kgError("");
        setStockError("");
        setLowStockError("");

        let hasError = false;

        if (!form.name.trim()) {

            setNameError("Product name is required.");

            hasError = true;

        }

        if (form.categoryId === 0) {

            setCategoryError("Please select a category.");

            hasError = true;

        }

        if (!form.imageUrl.trim()) {

            setImageUrlError("Image URL is required.");

            hasError = true;

        }

        if (form.price250g <= 0) {

            setPrice250Error("Price must be greater than zero.");

            hasError = true;

        }

        if (form.price500g <= 0) {

            setPrice500Error("Price must be greater than zero.");

            hasError = true;

        }

        if (form.price1kg <= 0) {

            setPrice1kgError("Price must be greater than zero.");

            hasError = true;

        }

        if (form.currentStockKg < 0) {

            setStockError("Stock cannot be negative.");

            hasError = true;

        }

        if (form.lowStockAlertKg < 0) {

            setLowStockError("Low stock cannot be negative.");

            hasError = true;

        }

        if (hasError) {

            return;

        }

        await onSubmit(form);

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>

                {buttonText}

            </h2>

            <input

                name="name"

                placeholder="Product Name"

                value={form.name}

                onChange={handleChange}

            />

            {

                nameError && (

                    <p className="error">

                        {nameError}

                    </p>

                )

            }

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

            {

                imageUrlError && (

                    <p className="error">

                        {imageUrlError}

                    </p>

                )

            }

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

            {

                categoryError && (

                    <p className="error">

                        {categoryError}

                    </p>

                )

            }

            <input

                type="number"

                name="price250g"

                placeholder="250g Price"

                value={form.price250g}

                onChange={handleChange}

            />

            {

                price250Error && (

                    <p className="error">

                        {price250Error}

                    </p>

                )

            }

            <input

                type="number"

                name="price500g"

                placeholder="500g Price"

                value={form.price500g}

                onChange={handleChange}

            />

            {

                price500Error && (

                    <p className="error">

                        {price500Error}

                    </p>

                )

            }

            <input

                type="number"

                name="price1kg"

                placeholder="1kg Price"

                value={form.price1kg}

                onChange={handleChange}

            />

            {

                price1kgError && (

                    <p className="error">

                        {price1kgError}

                    </p>

                )

            }

            <input

                type="number"

                name="currentStockKg"

                placeholder="Current Stock"

                value={form.currentStockKg}

                onChange={handleChange}

            />

            {

                stockError && (

                    <p className="error">

                        {stockError}

                    </p>

                )

            }

            <input

                type="number"

                name="lowStockAlertKg"

                placeholder="Low Stock Alert"

                value={form.lowStockAlertKg}

                onChange={handleChange}

            />

            {

                lowStockError && (

                    <p className="error">

                        {lowStockError}

                    </p>

                )

            }

            <button

                type="submit"

                disabled={loading}

            >

                {

                    loading

                        ? "Saving..."

                        : buttonText

                }

            </button>

        </form>

    );

}

export default ProductForm;