import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeScreen from "./Pages/HomePage";
import LoginScreen from "./Pages/LoginPage";
import SignupScreen from "./Pages/SignupPage";
import ProductViewScreen from "./Pages/ProductViewPage";
import ShoppingCartScreen from "./Pages/ShoppingCartPage";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import CheckoutForm from "./Pages/CheckoutFormPage";
import PaymentMethod from "./Pages/PaymentMethodPage";
import OrderConfirmation from "./Pages/OrderConfirmationPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated && <NavBar />}
      <main className="py-3">
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route
                path="/login"
                element={<LoginScreen onLogin={handleLogin} />}
              />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="*" element={<Navigate to="/login" />} />{" "}
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductViewScreen />} />
              <Route path="/cart" element={<ShoppingCartScreen />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />{" "}
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="/payment-method" element={<PaymentMethod />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation/>}
              />
            </>
          )}
        </Routes>
      </main>
      {isAuthenticated && <Footer />}
    </Router>
  );
};

export default App;
