import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ROUTES } from "../../constants/routes";
import { useCart } from "../../context/CartContext";
import { useAuthContext } from "../../auth/context/AuthContext";
import { useAccountModal } from "../../context/AccountModalContext";
import heartfulness from "../../assets/Catering Logo.jpeg";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import GoogleLoginFallback from "../../auth/components/GoogleLoginFallback";
import type { LoginResponse } from "../../auth/models/LoginResponse";

function Navbar() {
    const { cartCount } = useCart();
    const { customer, logout } = useAuthContext();
    const { closeModal } = useAccountModal();
    const navigate = useNavigate();

    const [cartUpdated, setCartUpdated] = useState(false);
    const [showGoogleLogin, setShowGoogleLogin] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const desktopDropdownRef = useRef<HTMLDivElement>(null);
    const mobileDropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        setShowMenu(false);
        closeModal();
        logout(() => {
            navigate(ROUTES.HOME);
        });
    };

    const handleGoogleLoginSuccess = (loggedInCustomer?: LoginResponse) => {
        setShowGoogleLogin(false);

        /*
         * ========================================
         * ADMIN LOGIN
         * ========================================
         *
         * Existing Google account is already
         * linked to an ADMIN customer.
         *
         * Send the admin directly to the
         * admin orders page.
         */

        if (loggedInCustomer?.role === "ADMIN") {
            navigate(ROUTES.ADMIN_ORDERS);
            return;
        }
    };

    const previousCartCount = useRef(cartCount);

    useEffect(() => {
        if (cartCount !== previousCartCount.current) {
            setCartUpdated(true);

            const timer = setTimeout(() => {
                setCartUpdated(false);
            }, 700);

            previousCartCount.current = cartCount;
            return () => clearTimeout(timer);
        }
    }, [cartCount]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const clickedInsideDesktop = desktopDropdownRef.current?.contains(target);
            const clickedInsideMobile = mobileDropdownRef.current?.contains(target);

            if (!clickedInsideDesktop && !clickedInsideMobile) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowMenu(false);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {showGoogleLogin && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0, 0, 0, 0.6)",
                        zIndex: 2000
                    }}
                >
                    <div style={{ background: "white", padding: "30px", borderRadius: "12px" }}>
                        <GoogleLoginFallback
                            onSuccess={handleGoogleLoginSuccess}
                            onError={message => {
                                console.error("Google login:", message);
                            }}
                        />
                    </div>
                </div>
            )}

            <header className={styles.navbar}>
                <div className={styles.container}>

                    {/* BRAND */}
                    <h2 className={styles.logo}>
                        <img src={heartfulness} alt="Arusuvai" className={styles.logoImage} />
                        <span className={styles.logoPrimary}>ARUSUVAI</span>
                        <span className={styles.logoSecondary}>SWEETS</span>
                    </h2>

                    {/* DESKTOP NAVIGATION */}
                    <nav className={styles.desktopNav}>
                        <ul className={styles.navLinks}>
                            <li>
                                <NavLink to={ROUTES.HOME} onClick={() => setShowMenu(false)}>
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={ROUTES.ORDERS} onClick={() => setShowMenu(false)}>
                                    My Orders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to={ROUTES.CART}
                                    className={`${cartUpdated ? styles.cartUpdated : ""}`}
                                    onClick={() => setShowMenu(false)}
                                >
                                    🛒 Cart
                                    <span className={styles.cartBadge}>{cartCount}</span>
                                </NavLink>
                            </li>

                            <li>
                                {customer ? (
                                    <div ref={desktopDropdownRef} className={styles.accountContainer}>
                                        <button
                                            className={`${styles.accountButton} ${styles.loggedIn}`}
                                            onClick={() => setShowMenu(!showMenu)}
                                        >
                                            👋 Hi {customer.name} ▼
                                        </button>

                                        {showMenu && (
                                            <div className={styles.dropdownMenu}>
                                                <button className={styles.dropdownItem} onClick={handleLogout}>
                                                    🚪 Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        className={`${styles.accountButton} ${styles.loggedOut}`}
                                        onClick={() => setShowGoogleLogin(true)}
                                    >
                                        Login
                                    </button>
                                )}
                            </li>
                        </ul>
                    </nav>

                    {/* MOBILE PROFILE */}
                    <div ref={mobileDropdownRef} className={styles.mobileAccount}>
                        <button
                            className={styles.mobileProfileButton}
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className={customer ? styles.profileLoggedIn : styles.profileLoggedOut}
                            />
                        </button>

                        {showMenu && customer && (
                            <div className={styles.mobileProfilePopup}>
                                <div className={styles.mobileCustomerName}>
                                    Hi {customer.name}
                                </div>

                                <button className={styles.mobileLogout} onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}

                        {showMenu && !customer && (
                            <div className={styles.mobileProfilePopup}>
                                <button
                                    className={styles.mobileLogin}
                                    onClick={() => setShowGoogleLogin(true)}
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* MOBILE NAVIGATION */}
                <nav className={styles.mobileNav}>
                    <NavLink to={ROUTES.HOME}>Home</NavLink>
                    <NavLink to={ROUTES.ORDERS}>My Orders</NavLink>

                    <NavLink
                        to={ROUTES.CART}
                        className={cartUpdated ? styles.cartUpdated : ""}
                    >
                        🛒 Cart
                        <span className={styles.cartBadge}>{cartCount}</span>
                    </NavLink>
                </nav>
            </header>
        </>
    );
}

export default Navbar;