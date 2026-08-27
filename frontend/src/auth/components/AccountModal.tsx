import { useEffect, useState } from "react";
import styles from "./AccountModal.module.css";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { useAccountModal } from "../../context/AccountModalContext";
import { useNavigate } from "react-router-dom";
import { PendingAction } from "../../constants/PendingAction";
import { ROUTES } from "../../constants/routes";
import { completeCustomerProfile, updateCustomerProfile } from "../../services/customerService";
import type { LoginResponse } from "../models/LoginResponse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

interface AccountModalProps {
    open: boolean;
    onClose: () => void;
}

function AccountModal({ open, onClose }: AccountModalProps) {
    const {
        customer,
        login,
        isLoggedIn,
        isGoogleUser
    } = useAuthContext();
    const [phoneNumber, setPhoneNumber] = useState(
        customer?.phoneNumber ?? ""
    );
    const [showRegistration, setShowRegistration] = useState(false);
    const [existingCustomer, setExistingCustomer] = useState<LoginResponse | null>(null);
    const [editingAddress, setEditingAddress] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [doorNo, setDoorNo] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [phoneError, setPhoneError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [doorNoError, setDoorNoError] = useState("");
    const [addressLine1Error, setAddressLine1Error] = useState("");
    const [cityError, setCityError] = useState("");
    const [stateError, setStateError] = useState("");
    const [pincodeError, setPincodeError] = useState("");
    const [locationError, setLocationError] = useState("");

    const [capturingLocation, setCapturingLocation] = useState(false);
    const [locationCaptured, setLocationCaptured] = useState(false);
    const [locationMessage, setLocationMessage] = useState("");

    const { checkPhone, loading } = useAuth();
    const {
        pendingAction,
        setPendingAction,
        closeModal,
        setPhoneVerified,
        setRegistrationPending
    } = useAccountModal();    const navigate = useNavigate();

    useEffect(() => {
        if (customer?.phoneNumber) {
            setPhoneNumber(customer.phoneNumber);
        }
    }, [customer]);

    if (!open) return null;

    const resetModal = () => {
        setPhoneNumber(customer?.phoneNumber ?? "");
        setShowRegistration(false);
        setExistingCustomer(null);
        setEditingAddress(false);
        setName("");
        setEmail("");
        setDoorNo("");
        setAddressLine1("");
        setAddressLine2("");
        setLandmark("");
        setCity("");
        setState("");
        setPincode("");
        setLatitude(null);
        setLongitude(null);
        setPhoneError("");
        setNameError("");
        setEmailError("");
        setDoorNoError("");
        setAddressLine1Error("");
        setCityError("");
        setStateError("");
        setPincodeError("");
        setLocationError("");
        setCapturingLocation(false);
        setLocationCaptured(false);
        setLocationMessage("");
    };

    const handleClose = () => {
        resetModal();
        setPendingAction(PendingAction.NONE);
        setRegistrationPending(false);
        closeModal();
        onClose();
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

    const handleContinue = async () => {
        setPhoneError("");
    
        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
            setPhoneError("Enter a valid 10-digit mobile number.");
            return;
        }
    
        try {
            const response = await checkPhone({ phoneNumber });
    
            if (!response.success) {
                setPhoneError(
                    response.message ||
                    "This phone number is not associated with your account."
                );
                return;
            }
    
            /*
             * ========================================
             * EXISTING GOOGLE CUSTOMER
             * ========================================
             *
             * If Google authentication has already
             * identified this user as an existing
             * customer, the entered phone number
             * MUST belong to that account.
             *
             * If the phone is not associated with
             * this account, NEVER open registration.
             */
    
            /*
             * ========================================
             * EXISTING CUSTOMER
             * ========================================
             */
    
            if (response.existingCustomer && response.customer) {

                const customer = response.customer;
    
                login(customer, response.token!);
            
                setExistingCustomer(customer);
                setName(customer.name);
                setEmail(customer.email ?? "");
                setDoorNo(customer.doorNo ?? "");
                setAddressLine1(customer.addressLine1 ?? "");
                setAddressLine2(customer.addressLine2 ?? "");
                setLandmark(customer.landmark ?? "");
                setCity(customer.city ?? "");
                setState(customer.state ?? "");
                setPincode(customer.pincode ?? "");
            
                setLatitude(customer.latitude ?? null);
                setLongitude(customer.longitude ?? null);
            
                setLocationCaptured(
                    customer.latitude != null &&
                    customer.longitude != null
                );
            
                setEditingAddress(false);
                setShowRegistration(true);
            
                return;
            }
    
            /*
             * ========================================
             * NEW CUSTOMER
             * ========================================
             *
             * This branch is allowed only when the
             * user is actually a new customer.
             */
    
            setExistingCustomer(null);
            setEditingAddress(true);
    
            setName("");
            setEmail("");
            setDoorNo("");
            setAddressLine1("");
            setAddressLine2("");
            setLandmark("");
            setCity("");
            setState("");
            setPincode("");
    
            setLatitude(null);
            setLongitude(null);
    
            setLocationCaptured(false);
            setShowRegistration(true);
    
        } catch (error: any) {
            setPhoneError(
                error?.response?.data?.message ||
                "Unable to verify phone number."
            );
        }
    };
        const handleCurrentLocation = () => {
            if (!navigator.geolocation) {
                setLocationError("Your browser does not support location services.");
                return;
            }
    
            setCapturingLocation(true);
            setLocationCaptured(false);
            setLocationMessage("Please wait... Capturing your current location. This may take a few seconds.");
    
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setCapturingLocation(false);
                    setLocationCaptured(true);
                    setLocationError("");
                    setLocationMessage("");
                },
                error => {
                    setCapturingLocation(false);
                    setLocationCaptured(false);
                    setLocationMessage("");
    
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setLocationError("Location permission was denied. Please allow location access.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setLocationError("Your current location could not be determined.");
                            break;
                        case error.TIMEOUT:
                            setLocationError("Location request timed out. Please try again.");
                            break;
                        default:
                            setLocationError("Unable to get your current location.");
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        };

    
        const handleRegister = async () => {
            setNameError("");
            setEmailError("");
            setDoorNoError("");
            setAddressLine1Error("");
            setCityError("");
            setStateError("");
            setPincodeError("");
            setLocationError("");
    
            let hasError = false;
    
            if (!name.trim()) {
                setNameError("Name is required.");
                hasError = true;
            }
    
            if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setEmailError("Please enter a valid email address.");
                hasError = true;
            }
    
            if (!doorNo.trim()) {
                setDoorNoError("Door No is required.");
                hasError = true;
            }
    
            if (!addressLine1.trim()) {
                setAddressLine1Error("Address Line 1 is required.");
                hasError = true;
            }
    
            if (!city.trim()) {
                setCityError("City is required.");
                hasError = true;
            }
    
            if (!state.trim()) {
                setStateError("State is required.");
                hasError = true;
            }
    
            if (!/^\d{6}$/.test(pincode)) {
                setPincodeError("Enter a valid 6-digit pincode.");
                hasError = true;
            }
    
            if (latitude === null || longitude === null) {
                setLocationError("Please capture your current location.");
                hasError = true;
            }
    
            if (hasError) return;
    
            try {
                if (existingCustomer && editingAddress) {
                    setExistingCustomer(previous => {
                        if (!previous) return previous;
                        return {
                            ...previous,
                            name,
                            email,
                            doorNo,
                            addressLine1,
                            addressLine2,
                            landmark,
                            city,
                            state,
                            pincode,
                            latitude,
                            longitude
                        };
                    });
    
                    setEditingAddress(false);
                    return;
                }
    
                if (existingCustomer) {
                    await updateCustomerProfile({
                        name,
                        phoneNumber,
                        email,
                        doorNo,
                        addressLine1,
                        addressLine2,
                        landmark,
                        city,
                        state,
                        pincode,
                        latitude,
                        longitude
                    });
    
                    setPhoneVerified(true);
                    resetModal();
                    continuePendingAction();
                    return;
                }
    
                const response = await completeCustomerProfile({
                    phoneNumber,
                    name,
                    email,
                    doorNo,
                    addressLine1,
                    addressLine2,
                    landmark,
                    city,
                    state,
                    pincode,
                    latitude,
                    longitude
                });
    
                if (!response.success || !response.customer || !response.token) {
                    alert(response.message);
                    return;
                }
    
                login(response.customer, response.token);
                setPhoneVerified(true);
                setRegistrationPending(false);
                resetModal();
                continuePendingAction();
            } catch (error: any) {
                alert(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Unable to save customer details."
                );
            }
        };
        return (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <h2 className={styles.title}>Login / Register</h2>
                    {!showRegistration ? (
                        <>
                            <input
                                className={styles.input}
                                value={phoneNumber}
                                onChange={event => { setPhoneNumber(event.target.value); setPhoneError(""); }}
                                placeholder="Enter Phone Number"
                                maxLength={10}
                            />
                            {phoneError && (
                                <p className={styles.errorText}>{phoneError}</p>
                            )}
                            <p className={styles.infoText}>⚠️ Please make sure this number is correct.<br />We'll use it for your order updates.</p>
                            <button
                                type="button"
                                className={styles.primaryButton}
                                onClick={handleContinue}
                                disabled={loading}
                            >
                                {loading ? "Checking..." : "Continue"}
                            </button>
                        </>
                    ) : (
                        <>
                            <p className={styles.infoText}>
                                {
                                    existingCustomer
                                        ? "Your details are already saved. Review them and update your delivery details if needed."
                                        : "Phone number confirmed successfully. Complete your profile to continue."
                                }
                            </p>
                            <input
                                className={styles.input}
                                value={name}
                                onChange={event => { setName(event.target.value); setNameError(""); }}
                                placeholder="Full Name"
                            />
                            {nameError && (
                                <p className={styles.errorText}>{nameError}</p>
                            )}
                            {/* =========================
                                EMAIL
                            ========================= */}
                            <input
                                className={styles.input}
                                value={email}
                                onChange={event => { setEmail(event.target.value); setEmailError(""); }}
                                placeholder="Email (Optional)"
                            />
                            {emailError && (
                                <p className={styles.errorText}>{emailError}</p>
                            )}
                            {/* =========================
                                EXISTING CUSTOMER
                                SAVED ADDRESS
                            ========================= */}
                            {
                                existingCustomer && !editingAddress
                                    ? (
                                        <>
                                            <div className={styles.savedAddress}>
                                                <p className={styles.savedAddressTitle}>Saved Delivery Address</p>
                                                <div>
                                                    {existingCustomer.doorNo}
                                                    {", "}
                                                    {existingCustomer.addressLine1}
                                                    {existingCustomer.addressLine2 && `, ${existingCustomer.addressLine2}`}
                                                    {existingCustomer.landmark && `, Near ${existingCustomer.landmark}`}
                                                    {existingCustomer.city && `, ${existingCustomer.city}`}
                                                    {existingCustomer.state && `, ${existingCustomer.state}`}
                                                    {existingCustomer.pincode && ` - ${existingCustomer.pincode}`}
                                                </div>
                                            </div>
                                            {/* =========================
                                                CHANGE ADDRESS
                                            ========================= */}
                                            <button
                                                type="button"
                                                className={styles.secondaryButton}
                                                onClick={() => setEditingAddress(true)}
                                            >
                                                 Change Address
                                            </button>
                                            {/* =========================
                                                FINAL SAVE
                                            ========================= */}
                                            <button
                                                type="button"
                                                className={styles.primaryButton}
                                                onClick={handleRegister}
                                                disabled={loading}
                                            >
                                                {loading ? "Saving..." : "Save"}
                                            </button>
                                        </>
                                    )
                                    : (
                                        /* =========================
                                           ADDRESS EDIT / NEW CUSTOMER
                                        ========================= */
                                        <>
                                            {/* Door No */}
                                            <input
                                                className={styles.input}
                                                value={doorNo}
                                                onChange={event => { setDoorNo(event.target.value); setDoorNoError(""); }}
                                                placeholder="Door / Flat No"
                                            />
                                            {doorNoError && (
                                                <p className={styles.errorText}>{doorNoError}</p>
                                            )}
                                            {/* Address Line 1 */}
                                            <input
                                                className={styles.input}
                                                value={addressLine1}
                                                onChange={event => { setAddressLine1(event.target.value); setAddressLine1Error(""); }}
                                                placeholder="Address Line 1"
                                            />
                                            {addressLine1Error && (
                                                <p className={styles.errorText}>{addressLine1Error}</p>
                                            )}
                                            {/* Address Line 2 */}
                                            <input
                                                className={styles.input}
                                                value={addressLine2}
                                                onChange={event => setAddressLine2(event.target.value)}
                                                placeholder="Address Line 2 (Optional)"
                                            />
                                            {/* Landmark */}
                                            <input
                                                className={styles.input}
                                                value={landmark}
                                                onChange={event => setLandmark(event.target.value)}
                                                placeholder="Landmark (Optional)"
                                            />
                                            {/* City */}
                                            <input
                                                className={styles.input}
                                                value={city}
                                                onChange={event => { setCity(event.target.value); setCityError(""); }}
                                                placeholder="City"
                                            />
                                            {cityError && (
                                                <p className={styles.errorText}>{cityError}</p>
                                            )}
                                            {/* State */}
                                            <input
                                                className={styles.input}
                                                value={state}
                                                onChange={event => { setState(event.target.value); setStateError(""); }}
                                                placeholder="State"
                                            />
                                            {stateError && (
                                                <p className={styles.errorText}>{stateError}</p>
                                            )}
                                            {/* Pincode */}
                                            <input
                                                className={styles.input}
                                                value={pincode}
                                                onChange={event => { setPincode(event.target.value); setPincodeError(""); }}
                                                placeholder="Pincode"
                                            />
                                            {pincodeError && (
                                                <p className={styles.errorText}>{pincodeError}</p>
                                            )}
                                            {/* =========================
                                                LOCATION
                                            ========================= */}
                                            <button
                                                type="button"
                                                className={styles.primaryButton}
                                                onClick={handleCurrentLocation}
                                                disabled={capturingLocation}
                                            >
                                        <FontAwesomeIcon
                                                icon={locationCaptured ? faCheck : faLocationCrosshairs}
                                                style={{ color: "#1e1e1e" }}
                                            />

                                            {
                                                locationCaptured
                                                    ? "Location Captured"
                                                    : capturingLocation
                                                        ? "Capturing Location..."
                                                        : "Use Current Location"
                                            }
                                            </button>
                                            {locationMessage && (
                                                <p className={styles.infoText}>{locationMessage}</p>
                                            )}
                                            {locationCaptured && (
                                                <p className={styles.successText}>
                                                    ✅ Location captured successfully.
                                                </p>
                                            )}
                                            {locationError && (
                                                <p className={styles.errorText}>{locationError}</p>
                                            )}
                                            {/* =========================
                                                SUBMIT / REGISTER
                                            ========================= */}
                                            <button
                                                type="button"
                                                className={styles.primaryButton}
                                                onClick={handleRegister}
                                                disabled={loading}
                                            >
                                                {
                                                    loading
                                                        ? "Saving..."
                                                        : existingCustomer
                                                            ? "Submit"
                                                            : "Register"
                                                }
                                            </button>
                                        </>
                                    )
                            }
                        </>
                    )}
                    {/* =========================
                        CLOSE
                    ========================= */}
                    <button
                        type="button"
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