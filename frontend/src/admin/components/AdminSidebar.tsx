import { NavLink, useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import "../styles/AdminSidebar.css";
import { useAuthContext } from "../../auth/context/AuthContext";

function AdminSidebar() {

    const navigate = useNavigate();

    const { logout } = useAuthContext();
    
    const handleLogout = () => {
    
        logout(() => {
    
            navigate(ROUTES.HOME);
    
        });
    
    };

    return (

        <aside className="admin-sidebar">

            <div className="admin-logo">

                Arusuvai Admin

            </div>

            <nav>

                <NavLink to={ROUTES.ADMIN_ORDERS}>

                    Orders

                </NavLink>

                <NavLink to={ROUTES.ADMIN_PRODUCTS}>

                    Products

                </NavLink>

                <NavLink to={ROUTES.ADMIN_CUSTOMERS}>

                    Customers

                </NavLink>

            </nav>
            <button
                className="logout-btn"

                onClick={handleLogout}

                >

                Logout

                </button>

        </aside>

    );

}

export default AdminSidebar;