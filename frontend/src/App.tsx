import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import Home from './pages/customer/Home';
import CategoryPage from './pages/customer/CategoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          {/* /product/:id, /cart, /checkout, /order-success, /orders
              will be added in upcoming modules */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;