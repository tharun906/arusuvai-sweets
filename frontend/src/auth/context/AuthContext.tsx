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

    updateCustomer: (
        customer: Omit<LoginResponse, "role">
    ) => void;

    logout: (
        callback?: () => void
    ) => void;

    isLoggedIn: boolean;

    isGoogleUser: boolean;

    setGoogleUser: (
        value: boolean
    ) => void;

    setGoogleAuthentication: (
        token: string
    ) => void;
}


const AuthContext =
    createContext<AuthContextType | undefined>(
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
                localStorage.getItem(
                    "customer"
                );

            if (savedCustomer) {

                return JSON.parse(
                    savedCustomer
                );

            }

            return null;

        });


    const [token, setToken] =
        useState<string | null>(() => {

            return localStorage.getItem(
                "token"
            );

        });


    const [isGoogleUser, setGoogleUser] =
        useState<boolean>(() => {

            return localStorage.getItem(
                "googleProfileIncomplete"
            ) === "true";

        });


    /*
     * ========================================
     * NORMAL LOGIN
     * ========================================
     *
     * Used for:
     *
     * 1. Normal customer login
     * 2. Existing Google customer login
     * 3. New Google customer after
     *    completing their profile
     */

    const login = (
        customer: LoginResponse,
        token: string
    ) => {

        setCustomer(
            customer
        );

        setToken(
            token
        );

        setGoogleUser(
            false
        );


        localStorage.setItem(
            "customer",
            JSON.stringify(
                customer
            )
        );

        localStorage.setItem(
            "token",
            token
        );

        localStorage.removeItem(
            "googleProfileIncomplete"
        );

    };


    /*
     * ========================================
     * GOOGLE AUTHENTICATION
     * ========================================
     *
     * Used when Google authentication
     * succeeds but the Arusuvai customer
     * profile has not been completed yet.
     *
     * customer remains null.
     */

    const setGoogleAuthentication = (
        token: string
    ) => {

        setToken(
            token
        );

        setGoogleUser(
            true
        );


        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "googleProfileIncomplete",
            "true"
        );

    };


    /*
     * ========================================
     * UPDATE CUSTOMER
     * ========================================
     *
     * ROLE is intentionally not accepted
     * from profile update.
     *
     * Existing authenticated role is
     * preserved.
     */

    const updateCustomer = (
        updatedCustomer: Omit<
            LoginResponse,
            "role"
        >
    ) => {

        setCustomer(
            previousCustomer => {

                if (!previousCustomer) {

                    return null;

                }


                const updatedLoginResponse:
                    LoginResponse = {

                    ...updatedCustomer,

                    role:
                        previousCustomer.role

                };


                localStorage.setItem(
                    "customer",
                    JSON.stringify(
                        updatedLoginResponse
                    )
                );


                return updatedLoginResponse;

            }
        );

    };


    /*
     * ========================================
     * LOGOUT
     * ========================================
     */

    const logout = (
        callback?: () => void
    ) => {

        setCustomer(
            null
        );

        setToken(
            null
        );

        setGoogleUser(
            false
        );


        localStorage.removeItem(
            "customer"
        );

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "googleProfileIncomplete"
        );


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

                updateCustomer,

                logout,

                isLoggedIn:
                    token !== null,

                isGoogleUser,

                setGoogleUser,

                setGoogleAuthentication

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}


export function useAuthContext() {

    const context =
        useContext(
            AuthContext
        );


    if (!context) {

        throw new Error(
            "useAuthContext must be used inside AuthProvider"
        );

    }


    return context;

}