import { useState } from "react";
import type { ProductRequest } from "../types/ProductRequest";
import { createProduct } from "../services/productService";

export function useCreateProduct() {

    const [loading, setLoading] = useState(false);

    const saveProduct = async (

        request: ProductRequest

    ) => {

        setLoading(true);

        try {

            return await createProduct(request);

        } finally {

            setLoading(false);

        }

    };

    return {

        loading,

        saveProduct,

    };

}