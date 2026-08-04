export interface LoginResponse {

    id: number;

    name: string;

    phoneNumber: string;

    email: string;

    address: string;

    latitude: number;

    longitude: number;

    role: "ADMIN" | "CUSTOMER";

}