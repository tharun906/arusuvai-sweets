import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { APP_NAME } from "../../constants/appConstants";
import { ROUTES } from "../../constants/routes";
import { useCart } from "../../context/CartContext";
import { useAuthContext } from "../../auth/context/AuthContext";
import { useAccountModal } from "../../context/AccountModalContext";
import {

    useState,

    useRef,

    useEffect

} from "react";
function Navbar() {
    const { cartCount } = useCart();
    const { customer, logout } = useAuthContext();
    const { openModal } = useAccountModal();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef =
    useRef<HTMLDivElement>(null);
    const handleLogout = () => {

        setShowMenu(false);
    
        logout(() => {
    
            navigate(ROUTES.HOME);
    
        });
    
    };

    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {
    
            if (
    
                dropdownRef.current &&
    
                !dropdownRef.current.contains(
                    event.target as Node
                )
    
            ) {
    
                setShowMenu(false);
    
            }
    
        };
    
        document.addEventListener(
    
            "mousedown",
    
            handleClickOutside
    
        );
    
        return () => {
    
            document.removeEventListener(
    
                "mousedown",
    
                handleClickOutside
    
            );
    
        };
    
    }, []);

    return (
        <header className={styles.navbar}>
            <div className={styles.container}>
                <h2 className={styles.logo}>  {APP_NAME} </h2>

                <nav>
                    <ul className={styles.navLinks}>
                        <li>
                        <NavLink to={ROUTES.HOME} onClick={() => setShowMenu(false)}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.ORDERS} onClick={() => setShowMenu(false)}>Orders</NavLink>
                        </li>

                        <li>
                        <NavLink to={ROUTES.CART} onClick={() => setShowMenu(false)}>
                            Cart ({cartCount})
                        </NavLink>
                        </li>

                        <li>
                            {  customer ? 
                            (<div

                                ref={dropdownRef}
                            
                                className={styles.accountContainer}
                            
                            >

                                <button
                            
                                    className={styles.accountButton}
                            
                                    onClick={() => setShowMenu(!showMenu)}
                            
                                >
                            
                                    👋 Hi {customer.name} ▼
                            
                                </button>
                            
                                {
                            
                                    showMenu && (
                            
                                        <div className={styles.dropdownMenu}>
                            
                                            <button
                            
                                                className={styles.dropdownItem}
                            
                                                onClick={handleLogout}
                            
                                            >
                            
                                                Logout
                            
                                            </button>
                            
                                        </div>
                            
                                    )
                            
                                }
                            
                            </div>
                                ) : (
                                    <button

    className={styles.accountButton}

    onClick={openModal}

>

    👤 Account

</button>

                                                                )
                            }
                        </li>
                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default Navbar;