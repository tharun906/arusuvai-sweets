import { GoogleLogin } from "@react-oauth/google";

import { authService } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";

import type { LoginResponse } from "../models/LoginResponse";

import styles from "./GoogleLoginFallback.module.css";


interface GoogleLoginFallbackProps {

    onSuccess?: (
        customer?: LoginResponse
    ) => void;

    onClose?: () => void;

    onError?: (
        message: string
    ) => void;

}


function GoogleLoginFallback({
    onSuccess,
    onClose,
    onError
}: GoogleLoginFallbackProps) {

    const {
        login,
        setGoogleAuthentication
    } = useAuthContext();


    const handleSuccess = async (
        credentialResponse: {
            credential?: string;
        }
    ) => {

        if (
            !credentialResponse.credential
        ) {

            onError?.(
                "Google login credential was not received."
            );

            return;
        }


        try {

            const response =
                await authService.googleLogin({

                    credential:
                        credentialResponse.credential

                });

                console.log("GOOGLE LOGIN RESPONSE:", response);
console.log("GOOGLE CUSTOMER:", response.customer);
console.log("GOOGLE ROLE:", response.customer?.role);


            if (
                !response.success ||
                !response.token
            ) {

                onError?.(
                    response.message ||
                    "Google login failed."
                );

                return;
            }


            /*
             * ========================================
             * EXISTING CUSTOMER / ADMIN
             * ========================================
             *
             * Google account is already linked
             * to an Arusuvai customer.
             *
             * The customer.role tells us whether
             * this account is:
             *
             * CUSTOMER
             * ADMIN
             */

            if (
                response.customer
            ) {

                login(
                    response.customer,
                    response.token
                );


                /*
                 * Store the temporary Google
                 * verification token.
                 */

                if (
                    response.googleVerificationToken
                ) {

                    localStorage.setItem(
                        "googleVerificationToken",
                        response.googleVerificationToken
                    );

                }


                /*
                 * Return the authenticated
                 * customer/admin to the caller.
                 *
                 * Navbar can now check:
                 *
                 * customer.role === "ADMIN"
                 */

                onSuccess?.(
                    response.customer
                );

                return;
            }


            /*
             * ========================================
             * NEW GOOGLE USER
             * ========================================
             *
             * Google authentication succeeded,
             * but the Arusuvai customer profile
             * does not exist yet.
             *
             * This always enters the CUSTOMER
             * registration flow.
             *
             * A new registration can never
             * create an ADMIN account.
             */

            setGoogleAuthentication(
                response.token
            );


            /*
             * Store the Google verification token.
             */

            if (
                response.googleVerificationToken
            ) {

                localStorage.setItem(
                    "googleVerificationToken",
                    response.googleVerificationToken
                );

            } else {

                localStorage.setItem(
                    "googleVerificationToken",
                    response.token
                );

            }


            /*
             * No existing customer exists,
             * so don't pass a customer object.
             *
             * The caller will continue with
             * the normal new-customer flow.
             */

            onSuccess?.();


        } catch (
            error: any
        ) {

            console.error(
                "Google login failed:",
                error
            );


            onError?.(
                error?.response?.data?.message ||
                "Unable to login with Google."
            );

        }

    };


    return (

        <div
            className={
                styles.overlay
            }
        >

            <div
                className={
                    styles.modal
                }
            >

                <button
                    type="button"
                    className={
                        styles.closeButton
                    }
                    onClick={
                        onClose
                    }
                    aria-label="Close"
                >
                    ×
                </button>


                <div
                    className={
                        styles.content
                    }
                >

                    <h2
                        className={
                            styles.title
                        }
                    >
                        Login to Arusuvai
                    </h2>


                    <p
                        className={
                            styles.description
                        }
                    >
                        Continue with your Google account
                        to access your account and orders.
                    </p>


                    <div
                        className={
                            styles.googleButton
                        }
                    >

                        <GoogleLogin

                            onSuccess={
                                handleSuccess
                            }

                            onError={() => {

                                onError?.(
                                    "Google login was cancelled or failed."
                                );

                            }}

                        />

                    </div>

                </div>

            </div>

        </div>

    );

}


export default GoogleLoginFallback;