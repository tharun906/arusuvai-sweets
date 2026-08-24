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
    const { customer, logout, isGoogleUser } = useAuthContext();
    const { closeModal } = useAccountModal();
    const navigate = useNavigate();

    const [cartUpdated, setCartUpdated] = useState(false);
    const [showGoogleLogin, setShowGoogleLogin] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const desktopDropdownRef = useRef<HTMLDivElement>(null);
    const mobileDropdownRef = useRef<HTMLDivElement>(null);
    const previousCartCount = useRef(cartCount);

    const handleLogout = () => {
        setShowMenu(false);
        closeModal();
        logout(() => navigate(ROUTES.HOME));
    };

    const handleGoogleLoginSuccess = (loggedInCustomer?: LoginResponse) => {
        setShowGoogleLogin(false);
        if (loggedInCustomer?.role === "ADMIN") {
            navigate(ROUTES.ADMIN_ORDERS);
        }
    };

    useEffect(() => {
        if (cartCount !== previousCartCount.current) {
            setCartUpdated(true);
            const timer = setTimeout(() => setCartUpdated(false), 700);
            previousCartCount.current = cartCount;
            return () => clearTimeout(timer);
        }
    }, [cartCount]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                !desktopDropdownRef.current?.contains(target) &&
                !mobileDropdownRef.current?.contains(target)
            ) setShowMenu(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => setShowMenu(false);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {showGoogleLogin && (
                <div className={styles.loginOverlay}>
                    <div className={styles.loginModal}>
                        <GoogleLoginFallback
                            onSuccess={handleGoogleLoginSuccess}
                            onClose={() => setShowGoogleLogin(false)}
                            onError={message => console.error("Google login:", message)}
                        />
                    </div>
                </div>
            )}

            <header className={styles.navbar}>
                <div className={styles.container}>
                    <h2 className={styles.logo}>
                        <img src={heartfulness} alt="Arusuvai" className={styles.logoImage} />
                        <span className={styles.logoPrimary}>ARUSUVAI</span>
                        <span className={styles.logoSecondary}>SWEETS</span>
                    </h2>

                    <nav className={styles.desktopNav}>
                        <ul className={styles.navLinks}>
                            <li><NavLink to={ROUTES.HOME}>Home</NavLink></li>
                            <li><NavLink to={ROUTES.ORDERS}>My Orders</NavLink></li>
                            <li>
                                <NavLink
                                    to={ROUTES.CART}
                                    className={cartUpdated ? styles.cartUpdated : ""}
                                >
                                    🛒 Cart <span className={styles.cartBadge}>{cartCount}</span>
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
                                        className={`${styles.accountButton} ${styles.loggedOut} ${
                                            isGoogleUser ? styles.loginDisabled : ""
                                        }`}
                                        onClick={() => {
                                            if (!isGoogleUser) {
                                                setShowGoogleLogin(true);
                                            }
                                        }}
                                        disabled={isGoogleUser}
                                    >
                                        Login
</button>
                                )}
                            </li>
                        </ul>
                    </nav>

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

                        {showMenu && (
                            <div className={styles.mobileProfilePopup}>
                                {customer ? (
                                    <>
                                        <div className={styles.mobileCustomerName}>Hi {customer.name}</div>
                                        <button className={styles.mobileLogout} onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className={`${styles.mobileLogin} ${
                                            isGoogleUser ? styles.loginDisabled : ""
                                        }`}
                                        onClick={() => {
                                            if (!isGoogleUser) {
                                                setShowGoogleLogin(true);
                                            }
                                        }}
                                        disabled={isGoogleUser}
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <nav className={styles.mobileNav}>
                    <NavLink to={ROUTES.HOME}>Home</NavLink>
                    <NavLink to={ROUTES.ORDERS}>My Orders</NavLink>
                    <NavLink to={ROUTES.CART} className={cartUpdated ? styles.cartUpdated : ""}>
                        🛒 Cart <span className={styles.cartBadge}>{cartCount}</span>
                    </NavLink>
                </nav>
            </header>
        </>
    );
}

export default Navbar;