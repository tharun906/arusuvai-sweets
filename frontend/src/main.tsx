import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./auth/context/AuthContext";
import { AccountModalProvider } from "./context/AccountModalContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
    "1068888337588-qtvvd5nj7r8jr8bhi6pgc2de510uqj1t.apps.googleusercontent.com";

console.log("GOOGLE CLIENT ID:", GOOGLE_CLIENT_ID);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
              <AccountModalProvider>
                  <CartProvider>
                      <App />
                  </CartProvider>
              </AccountModalProvider>
          </AuthProvider>
      </GoogleOAuthProvider>
  </React.StrictMode>
);