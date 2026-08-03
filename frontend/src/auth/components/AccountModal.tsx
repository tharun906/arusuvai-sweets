import { useState } from "react";
import styles from "./AccountModal.module.css";

import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { useAccountModal } from "../../context/AccountModalContext";
import { useNavigate } from "react-router-dom";
import { PendingAction } from "../../constants/PendingAction";
import { ROUTES } from "../../constants/routes";

interface AccountModalProps {

    open: boolean;

    onClose: () => void;

}

function AccountModal({

    open,

    onClose

}: AccountModalProps) {

    // -----------------------------
    // Login States
    // -----------------------------

    const [phoneNumber, setPhoneNumber] = useState("");

    const [otpSent, setOtpSent] = useState(false);

    const [otp, setOtp] = useState("");

    const [showRegistration, setShowRegistration] =
        useState(false);

    // -----------------------------
    // Registration States
    // -----------------------------

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [address, setAddress] = useState("");

    const [latitude, setLatitude] =
        useState<number>();

    const [longitude, setLongitude] =
        useState<number>();

    // -----------------------------
    // Validation States
    // -----------------------------

    const [phoneError, setPhoneError] = useState("");

    const [otpError, setOtpError] = useState("");

    const [nameError, setNameError] = useState("");

    const [addressError, setAddressError] = useState("");

    const [locationError, setLocationError] = useState("");

    // -----------------------------
    // Location States
    // -----------------------------

    const [capturingLocation, setCapturingLocation] =
        useState(false);

    const [locationCaptured, setLocationCaptured] =
        useState(false);

    const [locationMessage, setLocationMessage] =
        useState("");

    // -----------------------------
    // Hooks
    // -----------------------------

    const {

        sendOtp,

        verifyOtp,

        register,

        loading

    } = useAuth();

    const { login } = useAuthContext();

    const {
    
        pendingAction,
    
        setPendingAction,
    
        closeModal
    
    } = useAccountModal();
    
    const navigate = useNavigate();

    if (!open) {

        return null;

    }

    // ==========================================
    // Send OTP
    // ==========================================
    const resetModal = () => {

        setPhoneNumber("");
    
        setOtpSent(false);
    
        setOtp("");
    
        setShowRegistration(false);
    
        setName("");
    
        setEmail("");
    
        setAddress("");
    
        setLatitude(undefined);
    
        setLongitude(undefined);
    
        setPhoneError("");
    
        setOtpError("");
    
        setNameError("");
    
        setAddressError("");
    
        setLocationError("");
    
        setCapturingLocation(false);
    
        setLocationCaptured(false);
    
        setLocationMessage("");
    
    };

    const handleClose = () => {

        resetModal();
    
        closeModal();
    
    };


    const handleSendOtp = async () => {

        setPhoneError("");

        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {

            setPhoneError(
                "Enter a valid 10-digit mobile number."
            );

            return;

        }

        const response = await sendOtp({

            phoneNumber

        });

        if (!response.success) {

            alert(response.message);

            return;

        }

        setOtpSent(true);

    };

    const continuePendingAction = () => {

        switch (pendingAction) {
    
            case PendingAction.CHECKOUT:
    
                navigate(ROUTES.CHECKOUT);
    
                break;
    
            case PendingAction.ORDERS:
    
                navigate(ROUTES.ORDERS);
    
                break;
    
            default:
    
                break;
    
        }
    
        setPendingAction(PendingAction.NONE);
    
        closeModal();
    
    };

    // ==========================================
    // Verify OTP
    // ==========================================

    const handleVerifyOtp = async () => {

        setOtpError("");

        if (!/^\d{6}$/.test(otp)) {

            setOtpError(
                "Please enter a valid 6-digit OTP."
            );

            return;

        }

        const response = await verifyOtp({

            phoneNumber,

            otp

        });

        if (!response.success) {

            alert(response.message);

            return;

        }

        if (response.existingCustomer) {

            login(response.customer!);

            resetModal();
            
            continuePendingAction();
            
            return;
        }

        setShowRegistration(true);

    };

        // ==========================================
    // Capture Current Location
    // ==========================================

    const handleCurrentLocation = () => {

        setCapturingLocation(true);

        setLocationMessage(
            "Please wait... Capturing your current location. This may take a few seconds."
        );

        navigator.geolocation.getCurrentPosition(

            (position) => {

                setLatitude(position.coords.latitude);

                setLongitude(position.coords.longitude);

                setCapturingLocation(false);

                setLocationCaptured(true);

                setLocationError("");

                setLocationMessage("");

            },

            () => {

                setCapturingLocation(false);

                setLocationCaptured(false);

                setLocationMessage("");

                setLocationError(
                    "Unable to capture your current location."
                );

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

        );

    };

    // ==========================================
    // Register Customer
    // ==========================================

    const handleRegister = async () => {

        // Clear previous validation messages

        setNameError("");

        setAddressError("");

        setLocationError("");

        let hasError = false;

        // Name validation

        if (!name.trim()) {

            setNameError("Name is required.");

            hasError = true;

        }

        // Address validation

        if (!address.trim()) {

            setAddressError("Address is required.");

            hasError = true;

        }

        // Current Location validation

        if (
            latitude === undefined ||
            longitude === undefined
        ) {

            setLocationError(
                "Please capture your current location."
            );

            hasError = true;

        }

        if (hasError) {

            return;

        }

        // Call Backend

        const response = await register({

            phoneNumber,

            name,

            email,

            address,

            latitude,

            longitude

        });

        if (!response.success) {

            alert(response.message);

            return;

        }

        // Auto Login
        login(response.customer!);

        resetModal();

        continuePendingAction();

    };

    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h2 className={styles.title}>

                    Login / Register

                </h2>

                {

                    // ==========================================
                    // Screen 1 : Phone Number
                    // ==========================================

                    !otpSent ? (

                        <>

                            <input

                                className={styles.input}

                                value={phoneNumber}

                                onChange={(e) => {

                                    setPhoneNumber(e.target.value);

                                    setPhoneError("");

                                }}

                                placeholder="Enter Phone Number"

                            />

                            {phoneError && (

                                <p className={styles.errorText}>

                                    {phoneError}

                                </p>

                            )}

                      

                            <button

                                className={styles.primaryButton}

                                onClick={handleSendOtp}

                                disabled={loading}

                            >

                                {

                                    loading

                                        ? "Sending..."

                                        : "Send OTP"

                                }

                            </button>

                        </>

                    )

                    // ==========================================
                    // Screen 2 : OTP Verification
                    // ==========================================

                    : !showRegistration ? (

                        <>

                            <input

                                className={styles.input}

                                value={otp}

                                onChange={(e) => {

                                    setOtp(e.target.value);

                                    setOtpError("");

                                }}

                                placeholder="Enter OTP"

                            />

                            {otpError && (

                                <p className={styles.errorText}>

                                    {otpError}

                                </p>

                            )}

                            <p className={styles.infoText}>

                                OTP is valid for 5 minutes.

                            </p>

                            <button

                                className={styles.primaryButton}

                                onClick={handleVerifyOtp}

                                disabled={loading}

                            >

                                {

                                    loading

                                        ? "Verifying..."

                                        : "Verify OTP"

                                }

                            </button>

                        </>

                    )

                    // ==========================================
                    // Screen 3 : Registration
                    // ==========================================

                    : (

                        <>

                            <p className={styles.infoText}>

                                Phone number verified successfully.

                                <br />

                                Complete your profile to continue.

                            </p>

                            <input

                                className={styles.input}

                                value={name}

                                onChange={(e) => {

                                    setName(e.target.value);

                                    setNameError("");

                                }}

                                placeholder="Full Name"

                            />

                            {nameError && (

                                <p className={styles.errorText}>

                                    {nameError}

                                </p>

                            )}

                            <input

                                className={styles.input}

                                value={email}

                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }

                                placeholder="Email (Optional)"

                            />

                            <input

                                className={styles.input}

                                value={address}

                                onChange={(e) => {

                                    setAddress(e.target.value);

                                    setAddressError("");

                                }}

                                placeholder="Address"

                            />

                            {addressError && (

                                <p className={styles.errorText}>

                                    {addressError}

                                </p>

                            )}

                            <button

                                className={styles.primaryButton}

                                onClick={handleCurrentLocation}

                                disabled={
                                    capturingLocation ||
                                    locationCaptured
                                }

                            >

                                {

                                    locationCaptured

                                        ? "✅ Location Captured"

                                        : capturingLocation

                                            ? "📍 Capturing Location..."

                                            : "📍 Use Current Location"

                                }

                            </button>

                            {

                                locationMessage && (

                                    <p className={styles.infoText}>

                                        {locationMessage}

                                    </p>

                                )

                            }

                            {

                                locationCaptured && (

                                    <p className={styles.successText}>

                                        ✅ Location captured successfully.

                                    </p>

                                )

                            }

                            {

                                locationError && (

                                    <p className={styles.errorText}>

                                        {locationError}

                                    </p>

                                )

                            }

                            <button

                                className={styles.primaryButton}

                                onClick={handleRegister}

                                disabled={loading}

                            >

                                {

                                    loading

                                        ? "Registering..."

                                        : "Register"

                                }

                            </button>

                        </>

                    )

                }

<button

    className={styles.closeButton}

    onClick={handleClose}

>

    Close

</button>

            </div>

        </div>

    );

}

export default AccountModal;