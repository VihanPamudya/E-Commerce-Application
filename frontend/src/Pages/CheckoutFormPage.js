import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/CheckoutForm.css";

const CheckoutForm = ({ user }) => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipcode: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const deliveryCost = 100;

  const calculateTotalCost = () => {
    const subtotal = cartItems.reduce(
      (totalCost, item) => totalCost + item.price * item.quantity,
      0
    );
    return subtotal + deliveryCost;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipcode.trim() || !/^\d{5}$/.test(formData.zipcode)) {
      newErrors.zipcode = "Valid Zipcode is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const totalCost = calculateTotalCost();
      const orderData = {
        products: cartItems.map((item) => ({
          product: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity,
        })),
        shippingInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          zipcode: formData.zipcode,
        },
        totalCost,
      };

      navigate("/payment-method", { state: { orderData } });
    }
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="checkout-form-container">
      <div className="checkout-content">
        {/* Left-hand side: User details form */}
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          <form>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && <p className="error">{errors.address}</p>}
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && <p className="error">{errors.city}</p>}
            </div>                      

            <div className="form-group">
              <label>Zipcode</label>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
              />
              {errors.zipcode && <p className="error">{errors.zipcode}</p>}
            </div>
          </form>
        </div>

        {/* Right-hand side: Cost summary and buttons */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="summary-item">
              <p>
                {item.productName} - {item.quantity} x ${item.price.toFixed(2)}{" "}
                = ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="summary-item">
            <p>Delivery Fee: ${deliveryCost}</p>
          </div>

          <div className="summary-total">
            <h4>Total:</h4>
            <p>${calculateTotalCost().toFixed(2)}</p>
          </div>

          {/* Disable button if form is invalid */}
          <button
            className="proceed-to-payment-button"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Proceed to Payment
          </button>

          {/* Back to Cart Button */}
          <button
            type="button"
            className="back-to-cart-button"
            onClick={handleBackToCart}
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
