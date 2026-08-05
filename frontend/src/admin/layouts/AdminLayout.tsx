import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import "../styles/AdminLayout.css";

function AdminLayout() {

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <div className="admin-content">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;