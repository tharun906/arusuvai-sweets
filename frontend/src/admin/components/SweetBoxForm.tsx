import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../types/Product";
import type { SweetBoxRequest } from "../types/SweetBoxRequest";
import "../styles/SweetBoxForm.css";

interface SweetBoxFormProps {
    initialValues: SweetBoxRequest;
    buttonText: string;
    loading: boolean;
    onSubmit: (request: SweetBoxRequest) => Promise<void>;
}

function SweetBoxForm({ initialValues, buttonText, loading, onSubmit }: SweetBoxFormProps) {
    const { products, loading: productsLoading } = useProducts();
    const [form, setForm] = useState<SweetBoxRequest>(initialValues);
    const [selectedProductId, setSelectedProductId] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => { setForm(initialValues); }, [initialValues]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm(previous => ({
            ...previous,
            [name]: name === "price" ? Number(value) : name === "active" ? value === "true" : value
        }));
        setError("");
    };

    const addSweet = () => {
        if (selectedProductId === 0) return setError("Please select a sweet.");
        if (quantity < 1) return setError("Quantity must be at least 1.");
        if (form.items.some(item => item.productId === selectedProductId)) return setError("This sweet is already added.");

        setForm(previous => ({
            ...previous,
            items: [...previous.items, { productId: selectedProductId, quantity }]
        }));
        setSelectedProductId(0);
        setQuantity(1);
        setError("");
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setForm(previous => ({
            ...previous,
            items: previous.items.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        }));
    };

    const removeSweet = (productId: number) => {
        setForm(previous => ({
            ...previous,
            items: previous.items.filter(item => item.productId !== productId)
        }));
    };

    const getProductName = (productId: number) => {
        const product: Product | undefined = products.find(product => product.id === productId);
        return product?.name ?? "Unknown product";
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        if (!form.name.trim()) return setError("Sweet box name is required.");
        if (!form.totalWeight.trim()) return setError("Total weight is required.");
        if (form.price <= 0) return setError("Price must be greater than zero.");
        if (form.items.length === 0) return setError("Add at least one sweet to the box.");
        await onSubmit(form);
    };

    return (
        <form className="sweet-box-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="sweet-box-name">Sweet Box Name</label>
                <input id="sweet-box-name" name="name" type="text" placeholder="Example: Small Sweet Box" value={form.name} onChange={handleChange} />
            </div>

            <div className="form-field">
                <label htmlFor="sweet-box-weight">Total Weight</label>
                <input id="sweet-box-weight" name="totalWeight" type="text" placeholder="Example: 500g" value={form.totalWeight} onChange={handleChange} />
            </div>

            <div className="form-field">
                <label htmlFor="sweet-box-price">Price (₹)</label>
                <input id="sweet-box-price" name="price" type="number" min="0" step="0.01" placeholder="Enter price" value={form.price} onChange={handleChange} />
            </div>

            <div className="form-field">
                <label htmlFor="sweet-box-image">Image URL</label>
                <input id="sweet-box-image" name="imageUrl" type="text" placeholder="Enter image URL" value={form.imageUrl} onChange={handleChange} />
            </div>

            <div className="form-field">
                <label htmlFor="sweet-box-active">Status</label>
                <select id="sweet-box-active" name="active" value={form.active ? "true" : "false"} onChange={handleChange}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>

            <hr />
            <h3>What's Inside?</h3>

            <div className="sweet-box-item-list">
                {form.items.length === 0 && <p>No sweets added yet.</p>}
                {form.items.map(item => (
                    <div key={item.productId} className="sweet-box-item">
                        <span className="sweet-box-item-name">{getProductName(item.productId)}</span>
                        <input type="number" min="1" value={item.quantity} onChange={event => updateQuantity(item.productId, Number(event.target.value))} />
                        <button type="button" className="sweet-box-remove-btn" onClick={() => removeSweet(item.productId)}>Remove</button>
                    </div>
                ))}
            </div>

            <hr />
            <h3>Add Sweet</h3>

            <div className="form-field">
                <label htmlFor="sweet-box-product">Product</label>
                <select id="sweet-box-product" value={selectedProductId} onChange={event => setSelectedProductId(Number(event.target.value))} disabled={productsLoading}>
                    <option value={0}>{productsLoading ? "Loading products..." : "Select Sweet"}</option>
                    {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                </select>
            </div>

            <div className="form-field">
                <label htmlFor="sweet-box-quantity">Quantity</label>
                <input id="sweet-box-quantity" type="number" min="1" value={quantity} onChange={event => setQuantity(Number(event.target.value))} />
            </div>

            <button type="button" className="sweet-box-add-btn" onClick={addSweet}>+ Add Sweet</button>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="sweet-box-submit-btn" disabled={loading}>
                {loading ? "Saving..." : buttonText}
            </button>
        </form>
    );
}

export default SweetBoxForm;