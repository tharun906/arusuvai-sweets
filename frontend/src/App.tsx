import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import Home from './pages/customer/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          {/* Routes for /category/:id, /product/:id, /cart, /checkout,
              /order-success, /orders will be added in upcoming modules */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;