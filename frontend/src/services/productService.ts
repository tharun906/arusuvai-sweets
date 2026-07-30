import api from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import type { Product } from "../types/Product";


export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>(API_ENDPOINTS.PRODUCTS);
    return response.data;
};