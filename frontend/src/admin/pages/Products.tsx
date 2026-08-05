import { useProducts } from "../../hooks/useProducts";
import ProductForm from "../components/ProductForm";

import "../styles/AdminProducts.css";

function Products() {

    const {

        products,

        loading,

        error,

    } = useProducts();

    if (loading) {

        return <h2>Loading Products...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <div className="admin-products-page">

            <h1 className="admin-products-title">

                Product Management

            </h1>

            <ProductForm />

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

                            <th>Stock (Kg)</th>

                            <th>Low Stock</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            products.map((product) => (

                                <tr key={product.id}>

                                    <td>

                                        <img

                                            src={product.imageUrl}

                                            alt={product.name}

                                            className="product-image"

                                        />

                                    </td>

                                    <td>

                                        {product.name}

                                    </td>

                                    <td>

                                        {product.categoryName}

                                    </td>

                                    <td>

                                        ₹{product.price250g}

                                    </td>

                                    <td>

                                        ₹{product.price500g}

                                    </td>

                                    <td>

                                        ₹{product.price1kg}

                                    </td>

                                    <td>

                                        {product.currentStockKg}

                                    </td>

                                    <td>

                                        {product.lowStockAlertKg}

                                    </td>

                                    <td>

                                        {

                                            product.active

                                                ? "Active"

                                                : "Inactive"

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Products;