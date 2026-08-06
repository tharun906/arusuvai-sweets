import type { ProductRequest } from "../../types/ProductRequest";

export interface ProductFormProps {

    initialValues: ProductRequest;

    buttonText: string;

    loading: boolean;

    onSubmit: (
        request: ProductRequest
    ) => Promise<void>;

}