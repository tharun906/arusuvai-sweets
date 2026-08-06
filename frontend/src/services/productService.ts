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

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
};



export const updateProduct = async (id: number,request: ProductRequest): Promise<Product> => {
    const response = await api.put<Product>(`${API_ENDPOINTS.PRODUCTS}/${id}`,request);
    return response.data;
};

export const changeProductStatus = async ( id: number,active: boolean): Promise<void> => {
    await api.patch( `${API_ENDPOINTS.PRODUCTS}/${id}/status?active=${active}` );
};