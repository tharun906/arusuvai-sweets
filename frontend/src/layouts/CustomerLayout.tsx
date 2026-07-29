import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './CustomerLayout.css';

function CustomerLayout() {
  return (
    <div className="customer-layout">
      <Navbar />
      <main className="customer-layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default CustomerLayout;