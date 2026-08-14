import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../auth/context/AuthContext";
import { ROUTES } from "../constants/routes";

function AdminRoute() {

    const { customer, isLoggedIn } = useAuthContext();

    if (!isLoggedIn || !customer) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    if (customer.role !== "ADMIN") {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
}

export default AdminRoute;