import api from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { Product } from "../types/Product";
import type { ProductRequest } from "../types/ProductRequest";


export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>(API_ENDPOINTS.PRODUCTS);
    return response.data;
};

export const createProduct = async (request: ProductRequest): Promise<Product> => {

    const response = await api.post<Product>(API_ENDPOINTS.PRODUCTS,request);
    return response.data;

};