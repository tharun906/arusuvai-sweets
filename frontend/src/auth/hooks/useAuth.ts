import { useState } from "react";
import type { LoginRequest } from "../models/LoginRequest";
import type { OtpVerifyRequest } from "../models/OtpVerifyRequest";
import type { RegisterRequest } from "../models/RegisterRequest";
import { authService } from "../services/authService";

export function useAuth() {

    const [loading, setLoading] = useState(false);

    const sendOtp = async (request: LoginRequest) => {
        setLoading(true);

        try {
            return await authService.sendOtp(request);
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (request: OtpVerifyRequest) => {
        setLoading(true);
        try {
            return await authService.verifyOtp(request);
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
        sendOtp,
        verifyOtp,
        register
    };

}