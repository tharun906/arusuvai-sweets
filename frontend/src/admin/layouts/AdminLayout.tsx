import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import "../styles/AdminLayout.css";
import AdminSummaryCards from "../components/AdminSummaryCards";

function AdminLayout() {

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-main">

                <AdminHeader />

                <AdminSummaryCards />

                <div className="admin-content">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default AdminLayout;