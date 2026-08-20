import { useGoogleLogin } from "@react-oauth/google";

import { authService } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";


interface GoogleLoginButtonProps {

    onSuccess?: () => void;

    onError?: (message: string) => void;

}


function GoogleLoginButton({
    onSuccess,
    onError
}: GoogleLoginButtonProps) {

    const {
        login,
        setGoogleUser
    } = useAuthContext();


    const googleLogin =
        useGoogleLogin({

            onSuccess: async tokenResponse => {

                try {

                    /*
                     * Google OAuth access token
                     * is exchanged with our backend.
                     */

                    const response =
                        await authService.googleLogin({
                            credential:
                                tokenResponse.access_token
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
                     * Existing customer
                     *
                     * Backend already returned
                     * the final customer + JWT.
                     */

                    if (response.customer) {

                        setGoogleUser(
                            false
                        );

                        login(
                            response.customer,
                            response.token
                        );

                        onSuccess?.();

                        return;
                    }


                    /*
                     * Google user without a
                     * completed customer profile.
                     *
                     * Keep the temporary Google
                     * JWT and let the profile flow
                     * complete registration.
                     */

                    setGoogleUser(
                        true
                    );

                    localStorage.setItem(
                        "token",
                        response.token
                    );

                    localStorage.setItem(
                        "googleProfileIncomplete",
                        "true"
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

            },


            onError: () => {

                onError?.(
                    "Google login was cancelled or failed."
                );

            }

        });


    return (

        <button
            type="button"
            onClick={() => googleLogin()}
        >

            Continue with Google

        </button>

    );

}


export default GoogleLoginButton;