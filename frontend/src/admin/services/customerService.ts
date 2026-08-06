import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import api from "../../services/api";
import type { Customer } from "../types/Customer";

export const getCustomers = async (): Promise<Customer[]> => {

    const response = await api.get<Customer[]>(
        API_ENDPOINTS.CUSTOMERS
    );

    return response.data;

};