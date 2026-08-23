import { useGoogleOneTapLogin } from "@react-oauth/google";
import { authService } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";
import { ROUTES } from "../../constants/routes";

export default function GoogleOneTap() {
    const { login, setGoogleAuthentication, setGoogleUser, isLoggedIn } = useAuthContext();

    useGoogleOneTapLogin({
        use_fedcm_for_prompt: true,
        disabled: isLoggedIn,

        onSuccess: async (credentialResponse) => {
            if (!credentialResponse.credential) return;

            try {
                const response = await authService.googleLogin({
                    credential: credentialResponse.credential
                });

                console.log("ONE TAP GOOGLE RESPONSE:", response);
                console.log("ONE TAP CUSTOMER:", response.customer);
                console.log("ONE TAP ROLE:", response.customer?.role);

                if (!response.success || !response.token) return;

                /*
                 * ========================================
                 * EXISTING GOOGLE CUSTOMER / ADMIN
                 * ========================================
                 */

                if (response.customer) {
                    setGoogleUser(false);
                    login(response.customer, response.token);

                    if (response.googleVerificationToken) {
                        localStorage.setItem(
                            "googleVerificationToken",
                            response.googleVerificationToken
                        );
                    }

                    /*
                     * ========================================
                     * ADMIN
                     * ========================================
                     */

                    if (response.customer.role === "ADMIN") {
                        window.location.href = ROUTES.ADMIN_ORDERS;
                    }

                    return;
                }

                /*
                 * ========================================
                 * NEW GOOGLE CUSTOMER
                 * ========================================
                 */

                setGoogleAuthentication(response.token);

                /*
                 * Store Google verification token.
                 */

                if (response.googleVerificationToken) {
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
            } catch (error) {
                console.error("Google login failed:", error);
            }
        },

        onError: () => {
            console.error("Google One Tap failed");
        }
    });

    return null;
}