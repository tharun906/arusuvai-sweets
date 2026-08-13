import type { LoginResponse } from "./LoginResponse";

export interface AuthResponse {

    success: boolean;

    message: string;

    existingCustomer: boolean;

    customer: LoginResponse | null;

    token: string | null;

}