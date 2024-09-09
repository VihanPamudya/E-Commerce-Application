import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/PaymentMethod.css";

const PaymentMethod = () => {
  const location = useLocation();
  const { orderData } = location.state;
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const validateCardForm = () => {
    const newErrors = {};
    if (!cardDetails.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    }
    if (!cardDetails.nameOnCard.trim()) {
      newErrors.nameOnCard = "Name on card is required";
    }
    if (!cardDetails.expirationDate.trim()) {
      newErrors.expirationDate = "Expiration date is required";
    }
    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    }
    return newErrors;
  };

  const createOrder = async (paymentMethod, paymentDetails = null) => {
    const orderPayload = {
      products: orderData.products,
      shippingInfo: orderData.shippingInfo,
      payment: {
        method: paymentMethod,
        paymentDetails,
      },
      totalCost: orderData.totalCost,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const createdOrder = await response.json();
      console.log("Order created successfully:", createdOrder);

      localStorage.removeItem("cartItems");
      navigate("/order-confirmation", {
        state: { orderData: createdOrder, paymentMethod },
      });
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "credit-card") {
      const validationErrors = validateCardForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      alert("Simulated Card Payment Submitted!");

      await createOrder("credit-card", cardDetails);
    } else if (paymentMethod === "cash-on-delivery") {
      alert("Order Confirmed with Cash on Delivery!");

      await createOrder("cash-on-delivery");
    }
  };

  return (
    <div className="payment-method-container">
      <h2>Select Payment Method</h2>

      <div className="payment-options">
        <button
          className={paymentMethod === "credit-card" ? "selected" : ""}
          onClick={() => setPaymentMethod("credit-card")}
        >
          Credit/Debit Card
        </button>
        <button
          className={paymentMethod === "cash-on-delivery" ? "selected" : ""}
          onClick={() => setPaymentMethod("cash-on-delivery")}
        >
          Cash on Delivery
        </button>
      </div>

      {paymentMethod === "credit-card" && (
        <form onSubmit={handlePaymentSubmit}>
          <h3>Card Payment</h3>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="Enter card number"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
          </div>

          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              name="nameOnCard"
              placeholder="Enter name on card"
              value={cardDetails.nameOnCard}
              onChange={handleInputChange}
            />
            {errors.nameOnCard && <p className="error">{errors.nameOnCard}</p>}
          </div>

          <div className="form-group">
            <label>Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              placeholder="MM/YY"
              value={cardDetails.expirationDate}
              onChange={handleInputChange}
            />
            {errors.expirationDate && (
              <p className="error">{errors.expirationDate}</p>
            )}
          </div>

          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleInputChange}
            />
            {errors.cvv && <p className="error">{errors.cvv}</p>}
          </div>

          <button type="submit" className="button pay-now-button">
            Pay Now
          </button>
        </form>
      )}

      {paymentMethod === "cash-on-delivery" && (
        <div className="cash-on-delivery-info">
          <h3>Cash on Delivery</h3>
          <p>You will pay the courier when your order is delivered.</p>
          <button
            onClick={handlePaymentSubmit}
            className="button confirm-order-button"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
