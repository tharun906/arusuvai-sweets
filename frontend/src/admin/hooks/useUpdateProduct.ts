import { useState } from "react";
import type { ProductRequest } from "../../types/ProductRequest";
import { updateProduct } from "../../services/productService";



export function useUpdateProduct() {

    const [loading, setLoading] = useState(false);

    const editProduct = async (

        id: number,

        request: ProductRequest

    ) => {

        setLoading(true);

        try {

            return await updateProduct(id, request);

        } finally {

            setLoading(false);

        }

    };

    return {

        loading,

        editProduct,

    };

}