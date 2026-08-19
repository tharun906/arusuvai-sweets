import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useAuthContext } from "../context/AuthContext";
import { authService } from "../services/authService";


export default function GoogleOneTap() {

    const { login } = useAuthContext();

    useGoogleOneTapLogin({
        use_fedcm_for_prompt: true,
    
        onSuccess: async (credentialResponse) => {

            if (!credentialResponse.credential) {
                return;
            }

            try {

                const response =
                    await authService.googleLogin({
                        credential: credentialResponse.credential
                    });

                if (response.success && response.token) {

                    if (response.customer) {

                        login(
                            response.customer,
                            response.token
                        );

                    } else {

                        // Google authentication succeeded,
                        // but Arusuvai profile is not completed yet.
                        localStorage.setItem(
                            "token",
                            response.token
                        );
                    }
                }

            } catch (error) {

                console.error(
                    "Google login failed:",
                    error
                );
            }
        },

        onError: () => {
            console.error("Google One Tap failed");
        }
    });

    return null;
}