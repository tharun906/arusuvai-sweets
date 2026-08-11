import { useEffect, useState } from "react";

import { useProducts } from "../../hooks/useProducts";
import { useCreateProduct } from "../../hooks/useCreateProduct";

import ProductForm from "../components/ProductForm";

import type { ProductRequest } from "../../types/ProductRequest";

import "../styles/AdminProducts.css";
import type { Product } from "../../types/Product";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useProductStatus } from "../hooks/useProductStatus";
import Modal from "../../components/common/Modal";
import Toast from "../../components/common/Toast";

const EMPTY_PRODUCT: ProductRequest = {

    name: "",

    description: "",

    imageUrl: "",

    price250g: 0,

    price500g: 0,

    price1kg: 0,

    currentStockKg: 0,

    lowStockAlertKg: 0,

    categoryId: 0,

};

function Products() {

    const {

        products,

        loading,

        error,

    } = useProducts();

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success" as "success" | "error" | "warning" | "info",
    });

    useEffect(() => {

        if (!toast.show) return;
    
        const timer = setTimeout(() => {
            setToast((previous) => ({
                ...previous,
                show: false,
            }));
        }, 3000);
    
        return () => clearTimeout(timer);
    
    }, [toast.show]);

    const {

        saveProduct,

        loading: saving,

    } = useCreateProduct();

    const {

        editProduct,
    
        loading: updating,
    
    } = useUpdateProduct();

    const {

        updateStatus,
    
    } = useProductStatus();
    
    const [
    
        editingProduct,
    
        setEditingProduct,
    
    ] = useState<Product | null>(null);

    const [

        form,

        setForm,

    ] = useState<ProductRequest>(EMPTY_PRODUCT);

    const [showProductModal, setShowProductModal] = useState(false);

    const handleSubmit = async (

        request: ProductRequest
    
    ) => {
    
        if (editingProduct) {
    
            await editProduct(
    
                editingProduct.id,
    
                request
    
            );
    
            setToast({
                show: true,
                message: "Product updated successfully.",
                type: "success",
            });
    
        } else {
    
            await saveProduct(request);
    
            setToast({
                show: true,
                message: "Product created successfully.",
                type: "success",
            });
    
        }
    
        setEditingProduct(null);
        setForm(EMPTY_PRODUCT);
        setShowProductModal(false);
        
        window.location.reload();
    
    };

    if (loading) {

        return <h2>Loading Products...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (
        <>
        <Toast
            show={toast.show}
            message={toast.message}
            type={toast.type}
        />

        <div className="admin-products-page">

            <h1 className="admin-products-title">

                Product Management

            </h1>

            <button
                className="add-product-btn"
                onClick={() => {
                    setEditingProduct(null);
                    setForm(EMPTY_PRODUCT);
                    setShowProductModal(true);
                }}
            >
                + Add Product
            </button>

            <Modal
    open={showProductModal}
    title={
        editingProduct
            ? "Edit Product"
            : "Add Product"
    }
    onClose={() => {
        setShowProductModal(false);
        setEditingProduct(null);
        setForm(EMPTY_PRODUCT);
    }}
>
    <ProductForm
        initialValues={form}
        buttonText={
            editingProduct
                ? "Update Product"
                : "Save Product"
        }
        loading={saving || updating}
        onSubmit={handleSubmit}
    />
</Modal>

            <hr className="admin-products-divider" />

            <div className="admin-products-table-container">

                <table className="admin-products-table">

                    <thead>

                        <tr>

                            <th>Image</th>

                            <th>Name</th>

                            <th>Category</th>

                            <th>250g</th>

                            <th>500g</th>

                            <th>1kg</th>

                            <th>Stock</th>

                            <th>Low Stock</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            products.map((product) => (

                                <tr
                                    key={product.id}
                                    className={
                                        product.currentStockKg <= 0
                                            ? "out-of-stock-row"
                                            : product.currentStockKg <= product.lowStockAlertKg
                                            ? "low-stock-row"
                                            : ""
                                    }
                                >

                                    <td>

                                        <img

                                            src={product.imageUrl}

                                            alt={product.name}

                                            className="product-image"

                                        />

                                    </td>

                                    <td>{product.name}</td>

                                    <td>{product.categoryName}</td>

                                    <td>₹{product.price250g}</td>

                                    <td>₹{product.price500g}</td>

                                    <td>₹{product.price1kg}</td>

                                    <td>

                                        {

                                            product.currentStockKg <= 0

                                                ? "❌ Out of Stock"

                                                : product.currentStockKg <= product.lowStockAlertKg

                                                    ? `⚠️ ${product.currentStockKg} kg`

                                                    : `${product.currentStockKg} kg`

                                        }

                                    </td>

                                    <td>{product.lowStockAlertKg}</td>

                                    <td>

                                        {

                                            product.active

                                                ? "🟢 Active"

                                                : "🔴 Inactive"

                                        }

                                     </td>

                                     <td>

<button

    onClick={() => {
        setEditingProduct(product);

setForm({
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    price250g: product.price250g,
    price500g: product.price500g,
    price1kg: product.price1kg,
    currentStockKg: product.currentStockKg,
    lowStockAlertKg: product.lowStockAlertKg,
    categoryId: product.categoryId,
});

setShowProductModal(true);


       

    }}

>

    Edit

</button>

<button

    onClick={async () => {

        await updateStatus(

            product.id,

            !product.active

        );

        window.location.reload();

    }}

>

    {

        product.active

            ? "Deactivate"

            : "Activate"

    }

</button>

</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>
        </>

    );

}

export default Products;