export interface LoginResponse {

    id: number;

    name: string;

    phoneNumber: string;

    email: string;

    address: string;

    role: "ADMIN" | "CUSTOMER";

}