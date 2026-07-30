import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "../layouts/CustomerLayout";

import Home from "../pages/customer/Home";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import Orders from "../pages/customer/Orders";

import { ROUTES } from "../constants/routes";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<CustomerLayout />}>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.CART} element={<Cart />} />
                    <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                    <Route path={ROUTES.ORDERS} element={<Orders />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;