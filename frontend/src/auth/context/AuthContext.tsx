import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

import type { LoginResponse } from "../models/LoginResponse";

interface AuthContextType {

    customer: LoginResponse | null;

    token: string | null;

    login: (
        customer: LoginResponse,
        token: string
    ) => void;

    logout: (callback?: () => void) => void;

    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
                                 children
                             }: AuthProviderProps) {

    const [customer, setCustomer] =
        useState<LoginResponse | null>(() => {

            const savedCustomer =
                localStorage.getItem("customer");

            if (savedCustomer) {
                return JSON.parse(savedCustomer);
            }

            return null;
        });

    const [token, setToken] =
        useState<string | null>(() => {

            return localStorage.getItem("token");

        });

    const login = (
        customer: LoginResponse,
        token: string
    ) => {

        setCustomer(customer);
        setToken(token);

        localStorage.setItem(
            "customer",
            JSON.stringify(customer)
        );

        localStorage.setItem(
            "token",
            token
        );
    };

    const logout = (
        callback?: () => void
    ) => {

        setCustomer(null);
        setToken(null);

        localStorage.removeItem("customer");
        localStorage.removeItem("token");

        if (callback) {
            callback();
        }
    };

    return (

        <AuthContext.Provider
            value={{
                customer,
                token,
                login,
                logout,
                isLoggedIn:
                    customer !== null &&
                    token !== null
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}

export function useAuthContext() {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuthContext must be used inside AuthProvider"
        );

    }

    return context;
}