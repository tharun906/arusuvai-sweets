import { NavLink, useNavigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import "../styles/AdminSidebar.css";

import { useAuthContext } from "../../auth/context/AuthContext";
import { useState } from "react";

function AdminSidebar() {

    const navigate = useNavigate();

    const { logout } = useAuthContext();

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {

        logout(() => {
            navigate(ROUTES.HOME);
        });

    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                className="admin-menu-toggle"
                onClick={() => setIsOpen(true)}
                aria-label="Open admin menu"
            >
                ☰
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={closeSidebar}
                />
            )}

            <aside
                className={`admin-sidebar ${
                    isOpen ? "open" : ""
                }`}
            >

                <div className="admin-brand">

                    <span className="admin-brand-main">
                        ARUSUVAI
                    </span>

                    <span className="admin-brand-sub">
                        ADMIN PANEL
                    </span>

                </div>

                {/* Mobile close button */}
                <button
                    className="admin-sidebar-close"
                    onClick={closeSidebar}
                    aria-label="Close admin menu"
                >
                    ✕
                </button>

                <nav className="admin-nav">

                <NavLink
                    to={ROUTES.ADMIN_ORDERS}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                        `admin-nav-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span></span>
                    <span>Orders</span>
                </NavLink>

                <NavLink
                    to={ROUTES.ADMIN_PRODUCTS}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                        `admin-nav-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span></span>
                    <span>Products</span>
                </NavLink>

                <NavLink
                    to={ROUTES.ADMIN_SWEET_BOXES}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                        `admin-nav-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span></span>
                    <span>Sweet Boxes</span>
                </NavLink>

                <NavLink
                    to={ROUTES.ADMIN_CAROUSEL}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                        `admin-nav-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span></span>
                    <span>Brand Carousel</span>
                </NavLink>

                <NavLink
                    to={ROUTES.ADMIN_CUSTOMERS}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                        `admin-nav-link ${
                            isActive ? "active" : ""
                        }`
                    }
                >
                    <span></span>
                    <span>Customers</span>
                </NavLink>

                            <NavLink
                to={ROUTES.ADMIN_GALLERY}
                onClick={closeSidebar}
                className={({ isActive }) =>
                    `admin-nav-link ${
                        isActive ? "active" : ""
                    }`
                }
            >
                <span></span>
                <span>Gallery</span>
            </NavLink>

                </nav>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <span>↪</span>
                    <span>Logout</span>
                </button>

            </aside>
        </>
    );
}

export default AdminSidebar;