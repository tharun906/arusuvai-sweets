export interface RegisterRequest {

    phoneNumber: string;

    name: string;

    email: string;

    doorNo: string;

    addressLine1: string;

    addressLine2: string;

    landmark: string;

    city: string;

    state: string;

    pincode: string;

    latitude?: number;

    longitude?: number;

}