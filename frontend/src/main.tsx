import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./auth/context/AuthContext";
import { AccountModalProvider } from "./context/AccountModalContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <AuthProvider>
    <AccountModalProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AccountModalProvider>
  </AuthProvider>
  </React.StrictMode>
);