import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";
import { APP_NAME } from "../../constants/appConstants";
import { ROUTES } from "../../constants/routes";

function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.container}>
                <h2 className={styles.logo}>  {APP_NAME} </h2>

                <nav>
                    <ul className={styles.navLinks}>
                        <li>
                            <NavLink to={ROUTES.HOME}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.ORDERS}>Orders</NavLink>
                        </li>

                        <li>
                            <NavLink to={ROUTES.CART}>Cart (0)</NavLink>
                        </li>

                    </ul>
                </nav>

            </div>

        </header>
    );
}

export default Navbar;