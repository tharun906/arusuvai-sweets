import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AccountModal from "../auth/components/AccountModal";
import { useAccountModal } from "../context/AccountModalContext";

function CustomerLayout() {
    const {
        open,
        closeModal,
    } = useAccountModal();

    return (
        <>
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />

            <AccountModal
                open={open}
                onClose={closeModal}
            />
        </>
    );
}

export default CustomerLayout;