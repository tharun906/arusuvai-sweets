import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import Cart from "../pages/customer/Cart";
import Orders from "../pages/customer/Orders";
import Checkout from "../pages/customer/Checkout";
import { ROUTES } from "../constants/routes";
import AdminOrders from "../admin/pages/Orders";
import Products from "../admin/pages/Products";
import Customers from "../admin/pages/Customers";
import SweetBoxes from "../admin/pages/SweetBoxes";
import CarouselManagement from "../admin/pages/CarouselManagement";
import GalleryManagement from "../admin/pages/GalleryManagement";
import AdminLayout from "../admin/layouts/AdminLayout";
import AdminRoute from "./AdminRoute";
import About from "../pages/customer/business/About";
import Contact from "../pages/customer/business/Contact";
import PrivacyPolicy from "../pages/customer/business/PrivacyPolicy";
import TermsAndConditions from "../pages/customer/business/TermsAndConditions";
import ShippingDelivery from "../pages/customer/business/ShippingDelivery";
import CancellationRefund from "../pages/customer/business/CancellationRefund";
import Services from "../pages/customer/business/Services";
import ReturnReplacement from "../pages/customer/business/ReturnReplacement";
import ComboPackManagement from "../admin/pages/ComboPackManagement";
import ScrollToTop from "../components/common/ScrollToTop";

function AppRoutes() {
    return (
        <BrowserRouter>
         <ScrollToTop />

            <Routes>
            <Route element={<CustomerLayout />}>

                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.CART} element={<Cart />} />
                <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                <Route path={ROUTES.ORDERS} element={<Orders />} />

                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.SERVICES} element={<Services />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />

                <Route
                    path={ROUTES.PRIVACY_POLICY}
                    element={<PrivacyPolicy />}
                />

                <Route
                    path={ROUTES.TERMS_AND_CONDITIONS}
                    element={<TermsAndConditions />}
                />

                <Route
                    path={ROUTES.SHIPPING_DELIVERY}
                    element={<ShippingDelivery />}
                />

                <Route
                    path={ROUTES.CANCELLATION_REFUND}
                    element={<CancellationRefund />}
                />

                <Route
                    path={ROUTES.RETURN_REPLACEMENT}
                    element={<ReturnReplacement />}
                />

                </Route>
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
                        path={ROUTES.ADMIN_COMBO_PACK}
                        element={<ComboPackManagement />}
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