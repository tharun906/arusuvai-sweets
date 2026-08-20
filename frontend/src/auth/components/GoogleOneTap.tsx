import { useGoogleOneTapLogin } from "@react-oauth/google";
import { authService } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";

export default function GoogleOneTap() {

    const {
        login,
        setGoogleUser,
        isLoggedIn
    } = useAuthContext();

    useGoogleOneTapLogin({

        use_fedcm_for_prompt: true,

        disabled: isLoggedIn,

        onSuccess: async (credentialResponse) => {

            if (!credentialResponse.credential) {
                return;
            }

            try {

                const response =
                    await authService.googleLogin({
                        credential:
                            credentialResponse.credential
                    });

                if (response.success && response.token) {

                    if (response.customer) {

                        setGoogleUser(false);

                        login(
                            response.customer,
                            response.token
                        );

                    } else {

                        setGoogleUser(true);

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
            console.error(
                "Google One Tap failed"
            );
        }
    });

    return null;
}