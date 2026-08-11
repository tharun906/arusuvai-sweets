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

    const [nameError, setNameError] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [imageUrlError, setImageUrlError] = useState("");
    const [price250Error, setPrice250Error] = useState("");
    const [price500Error, setPrice500Error] = useState("");
    const [price1kgError, setPrice1kgError] = useState("");
    const [stockError, setStockError] = useState("");
    const [lowStockError, setLowStockError] = useState("");

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

        setForm(previous => ({
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
            setNameError(
                "Product name is required."
            );
            hasError = true;
        }

        if (form.categoryId === 0) {
            setCategoryError(
                "Please select a category."
            );
            hasError = true;
        }

        if (!form.imageUrl.trim()) {
            setImageUrlError(
                "Image URL is required."
            );
            hasError = true;
        }

        if (form.price250g <= 0) {
            setPrice250Error(
                "Price must be greater than zero."
            );
            hasError = true;
        }

        if (form.price500g <= 0) {
            setPrice500Error(
                "Price must be greater than zero."
            );
            hasError = true;
        }

        if (form.price1kg <= 0) {
            setPrice1kgError(
                "Price must be greater than zero."
            );
            hasError = true;
        }

        if (form.currentStockKg < 0) {
            setStockError(
                "Stock cannot be negative."
            );
            hasError = true;
        }

        if (form.lowStockAlertKg < 0) {
            setLowStockError(
                "Low stock cannot be negative."
            );
            hasError = true;
        }

        if (hasError) return;

        await onSubmit(form);
    };

    return (

        <form
            className="product-form"
            onSubmit={handleSubmit}
        >

            {/* Product Name */}

            <div className="form-field">

                <label htmlFor="product-name">
                    Product Name
                </label>

                <input
                    id="product-name"
                    name="name"
                    type="text"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={handleChange}
                />

                {nameError && (
                    <p className="error">
                        {nameError}
                    </p>
                )}

            </div>


            {/* Description */}

            <div className="form-field">

                <label htmlFor="product-description">
                    Description
                </label>

                <textarea
                    id="product-description"
                    name="description"
                    placeholder="Enter product description"
                    value={form.description}
                    onChange={handleChange}
                />

            </div>


            {/* Image URL */}

            <div className="form-field">

                <label htmlFor="product-image">
                    Image URL
                </label>

                <input
                    id="product-image"
                    name="imageUrl"
                    type="text"
                    placeholder="Enter image URL"
                    value={form.imageUrl}
                    onChange={handleChange}
                />

                {imageUrlError && (
                    <p className="error">
                        {imageUrlError}
                    </p>
                )}

            </div>


            {/* Category */}

            <div className="form-field">

                <label htmlFor="product-category">
                    Category
                </label>

                <select
                    id="product-category"
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                >

                    <option value={0}>
                        Select Category
                    </option>

                    {categories.map(category => (

                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>

                    ))}

                </select>

                {categoryError && (
                    <p className="error">
                        {categoryError}
                    </p>
                )}

            </div>


            {/* 250g Price */}

            <div className="form-field">

                <label htmlFor="price-250">
                    250g Price (₹)
                </label>

                <input
                    id="price-250"
                    type="number"
                    name="price250g"
                    placeholder="Enter price for 250g"
                    value={form.price250g}
                    onChange={handleChange}
                    min="0"
                />

                {price250Error && (
                    <p className="error">
                        {price250Error}
                    </p>
                )}

            </div>


            {/* 500g Price */}

            <div className="form-field">

                <label htmlFor="price-500">
                    500g Price (₹)
                </label>

                <input
                    id="price-500"
                    type="number"
                    name="price500g"
                    placeholder="Enter price for 500g"
                    value={form.price500g}
                    onChange={handleChange}
                    min="0"
                />

                {price500Error && (
                    <p className="error">
                        {price500Error}
                    </p>
                )}

            </div>


            {/* 1kg Price */}

            <div className="form-field">

                <label htmlFor="price-1kg">
                    1kg Price (₹)
                </label>

                <input
                    id="price-1kg"
                    type="number"
                    name="price1kg"
                    placeholder="Enter price for 1kg"
                    value={form.price1kg}
                    onChange={handleChange}
                    min="0"
                />

                {price1kgError && (
                    <p className="error">
                        {price1kgError}
                    </p>
                )}

            </div>


            {/* Current Stock */}

            <div className="form-field">

                <label htmlFor="current-stock">
                    Current Stock (kg)
                </label>

                <input
                    id="current-stock"
                    type="number"
                    name="currentStockKg"
                    placeholder="Enter current stock"
                    value={form.currentStockKg}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                />

                {stockError && (
                    <p className="error">
                        {stockError}
                    </p>
                )}

            </div>


            {/* Low Stock Alert */}

            <div className="form-field">

                <label htmlFor="low-stock">
                    Low Stock Alert (kg)
                </label>

                <input
                    id="low-stock"
                    type="number"
                    name="lowStockAlertKg"
                    placeholder="Enter low stock alert"
                    value={form.lowStockAlertKg}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                />

                {lowStockError && (
                    <p className="error">
                        {lowStockError}
                    </p>
                )}

            </div>


            {/* Save / Update */}

            <button
                type="submit"
                className="product-submit-btn"
                disabled={loading}
            >
                {loading
                    ? "Saving..."
                    : buttonText}
            </button>

        </form>
    );
}

export default ProductForm;