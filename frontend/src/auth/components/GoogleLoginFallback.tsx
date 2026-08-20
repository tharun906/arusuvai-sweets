import { GoogleLogin } from "@react-oauth/google";

import { authService } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";

import styles from "./GoogleLoginFallback.module.css";


interface GoogleLoginFallbackProps {

    onSuccess?: () => void;

    onClose?: () => void;

    onError?: (message: string) => void;

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
             * EXISTING CUSTOMER
             * ========================================
             */

            if (response.customer) {

                login(
                    response.customer,
                    response.token
                );

                onSuccess?.();

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
             * AuthContext will now set:
             *
             * isLoggedIn = true
             * isGoogleUser = true
             * customer = null
             */

            setGoogleAuthentication(
                response.token
            );


            onSuccess?.();

        } catch (error: any) {

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

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <button
                    type="button"
                    className={
                        styles.closeButton
                    }
                    onClick={onClose}
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