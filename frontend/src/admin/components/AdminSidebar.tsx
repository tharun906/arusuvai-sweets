import { NavLink } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import "../styles/AdminSidebar.css";

function AdminSidebar() {

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

            <button className="logout-btn">

                Logout

            </button>

        </aside>

    );

}

export default AdminSidebar;