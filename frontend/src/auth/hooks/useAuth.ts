import { useState } from "react";
import type { LoginRequest } from "../models/LoginRequest";
import type { RegisterRequest } from "../models/RegisterRequest";
import { authService } from "../services/authService";

export function useAuth() {

    const [loading, setLoading] = useState(false);

    const checkPhone = async (request: LoginRequest) => {

        setLoading(true);

        try {
            return await authService.checkPhone(request);
        } finally {
            setLoading(false);
        }
    };

    const register = async (request: RegisterRequest) => {

        setLoading(true);

        try {
            return await authService.register(request);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        checkPhone,
        register
    };
}