import { useState } from "react";
import { changeProductStatus } from "../../services/productService";


export function useProductStatus() {

    const [loading, setLoading] = useState(false);

    const updateStatus = async (
        id: number,
        active: boolean
    ) => {

        setLoading(true);

        try {

            await changeProductStatus(id, active);

        } finally {

            setLoading(false);

        }

    };

    return {

        loading,

        updateStatus,

    };

}