export interface RegisterRequest {
    phoneNumber: string;
    name: string;
    email: string;
    address: string;
    latitude?: number;
    longitude?: number;
}