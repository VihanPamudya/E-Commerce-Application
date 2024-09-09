import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmtImg from '../Images/Empty.png'
import "../Styles/ShoppingCart.css";

const ShoppingCartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const deliveryCost = 100;
  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  const removeItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter(
      (item, index) => index !== indexToRemove
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (subtotal, item) => subtotal + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + deliveryCost;
  };

  const handleContinueShopping = () => {
    navigate("/dashboard");
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div
          className="empty-cart"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <img width="40%" src={EmtImg} alt="Empty cart" />
          <h2 style={{color: "red"}}>Your cart is empty</h2>
          <div className="cart-buttons">
            <button
              className="continue-shopping-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="cart-table">
            <div className="cart-header">
              <span>Description</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Total Price</span>
              <span>Remove</span>
            </div>

            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="cart-description">
                  <img src={item.image} alt={item.productName} />
                  <div>
                    <p className="product-title">{item.productName}</p>
                  </div>
                </div>
                <span>{item.quantity}</span>
                <span>${item.price}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <span className="remove-item" onClick={() => removeItem(index)}>
                  x
                </span>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Delivery</span>
              <span>${deliveryCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>

            <div className="cart-buttons">
              <button
                className="continue-shopping-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCartScreen;
