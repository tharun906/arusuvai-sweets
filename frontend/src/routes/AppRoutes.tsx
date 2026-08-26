import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";

import Home from "../pages/customer/Home";
import Cart from "../pages/customer/Cart";

import Orders from "../pages/customer/Orders";

import { ROUTES } from "../constants/routes";
import AdminOrders from "../admin/pages/Orders";
import Products from "../admin/pages/Products";
import Customers from "../admin/pages/Customers";
import AdminLayout from "../admin/layouts/AdminLayout";
import AdminRoute from "./AdminRoute";
import Checkout from "../pages/customer/Checkout";
import SweetBoxes from "../admin/pages/SweetBoxes";
import CarouselManagement from "../admin/pages/CarouselManagement";
import GalleryManagement from "../admin/pages/GalleryManagement";


function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                {/* CUSTOMER ROUTES */}
                <Route element={<CustomerLayout />}>

                    <Route
                        path={ROUTES.HOME}
                        element={<Home />}
                    />

                    <Route
                        path={ROUTES.CART}
                        element={<Cart />}
                    />

                    <Route
                        path={ROUTES.CHECKOUT}
                        element={<Checkout />}
                    />

                    <Route
                        path={ROUTES.ORDERS}
                        element={<Orders />}
                    />

                </Route>


                {/* ADMIN ROUTES */}
                <Route element={<AdminRoute />}>

                    <Route element={<AdminLayout />}>

                        <Route
                            path={ROUTES.ADMIN_DASHBOARD}
                            element={
                                <Navigate
                                    to={ROUTES.ADMIN_ORDERS}
                                    replace
                                />
                            }
                        />

                        <Route
                            path={ROUTES.ADMIN_ORDERS}
                            element={<AdminOrders />}
                        />

                        <Route
                            path={ROUTES.ADMIN_PRODUCTS}
                            element={<Products />}
                        />

                        <Route
                            path={ROUTES.ADMIN_SWEET_BOXES}
                            element={<SweetBoxes />}
                        />

                        <Route
                            path={ROUTES.ADMIN_CUSTOMERS}
                            element={<Customers />}
                        />

                        <Route
                            path={ROUTES.ADMIN_CAROUSEL}
                            element={<CarouselManagement />}
                        />

                        <Route
                            path={ROUTES.ADMIN_GALLERY}
                            element={<GalleryManagement />}
                        />


                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;