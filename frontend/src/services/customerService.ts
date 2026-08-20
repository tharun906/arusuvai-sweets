import api from "./api";
import type { AuthResponse } from "../auth/models/AuthResponse";
import type { RegisterRequest } from "../auth/models/RegisterRequest";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export interface CustomerResponse {

    id: number;

    name: string;

    phoneNumber: string;

    email: string;

    doorNo: string;

    addressLine1: string;

    addressLine2?: string;

    landmark?: string;

    city: string;

    state: string;

    pincode: string;

    latitude: number | null;

    longitude: number | null;
}

export interface PhoneVerificationRequest {

    phoneNumber: string;
}


/*
 * =========================
 * NEW CUSTOMER
 * =========================
 */

export const completeCustomerProfile = async (
    request: RegisterRequest
): Promise<AuthResponse> => {

    const response =
        await api.post<AuthResponse>(
            API_ENDPOINTS.CUSTOMER_PROFILE,
            request
        );

    return response.data;
};


/*
 * =========================
 * VERIFY PHONE
 * =========================
 */

export const verifyCustomerPhone = async (
    phoneNumber: string
): Promise<CustomerResponse> => {

    const response =
        await api.post<CustomerResponse>(
            `${API_ENDPOINTS.CUSTOMERS}/verify-phone`,
            {
                phoneNumber
            }
        );

    return response.data;
};


/*
 * =========================
 * EXISTING CUSTOMER
 * UPDATE PROFILE
 * =========================
 *
 * Normal customer JWT contains
 * customerId as the JWT subject.
 *
 * Therefore use:
 *
 * PUT /api/customer/me
 *
 * NOT:
 *
 * PUT /api/customer/profile
 *
 * /profile is only for Google
 * profile completion/update flow.
 */

export const updateCustomerProfile = async (
    request: RegisterRequest
): Promise<CustomerResponse> => {

    const response =
        await api.put<CustomerResponse>(
            `${API_ENDPOINTS.CUSTOMERS}/me`,
            request
        );

    return response.data;
};