import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

import type { LoginResponse } from "../models/LoginResponse";

interface AuthContextType {

    customer: LoginResponse | null;

    login: (customer: LoginResponse) => void;

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
    const login = (
        customer: LoginResponse
    ) => {
    
        setCustomer(customer);
    
        localStorage.setItem(
    
            "customer",
    
            JSON.stringify(customer)
    
        );
    
    };

    const logout = (
        callback?: () => void
    ) => {
    
        setCustomer(null);
    
        localStorage.removeItem("customer");
    
        if (callback) {
    
            callback();
    
        }
    
    };

    return (

        <AuthContext.Provider

            value={{

                customer,

                login,

                logout,

                isLoggedIn: customer !== null

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