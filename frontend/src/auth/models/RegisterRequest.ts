export interface RegisterRequest {

    name: string;

    phoneNumber: string;

    email: string;

    doorNo: string;

    addressLine1: string;

    addressLine2: string;

    landmark: string;

    city: string;

    state: string;

    pincode: string;

    latitude: number | null;

    longitude: number | null;
}