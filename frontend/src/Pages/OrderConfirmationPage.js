import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../Styles/OrderConfirmation.css'

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderData, paymentMethod } = location.state || {};
  const navigate = useNavigate();

  return (
    <div className="order-confirmation-container">
      <h2>Order Confirmation</h2>
      <p>Your order has been confirmed!</p>
      <p>
        Payment Method:{" "}
        {paymentMethod === "credit-card" ? "Card Payment" : "Cash on Delivery"}
      </p>

      <h3>Order Summary:</h3>
      {orderData?.products.map((item, index) => (
        <p key={index}>
          {item.productName} - {item.quantity} x ${item.price.toFixed(2)} = $
          {(item.price * item.quantity).toFixed(2)}
        </p>
      ))}
      <p>Total Cost: ${orderData?.totalCost.toFixed(2)}</p>

      <button className="homepage-button" onClick={() => navigate("/")}>
        Go to Homepage
      </button>
    </div>
  );
};

export default OrderConfirmation;
