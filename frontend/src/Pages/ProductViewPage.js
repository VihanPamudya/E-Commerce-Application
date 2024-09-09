import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/ProductViewScreen.css";

const ProductViewScreen = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState({ countInStock: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);


  if (!product || !product.name) {
    return <div>Loading...</div>;
  }

  const increaseQuantity = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      productName: product.name,
      quantity,
      price: product.price,
      image: product.image,
    };

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingProductIndex = existingCart.findIndex(
      (item) => item.productName === cartItem.productName
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += cartItem.quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    navigate("/cart");
  };


  const buttonStyles = {
    backgroundColor: quantity === 0 ? "gray" : "#28a745",
    cursor: quantity === 0 ? "not-allowed" : "pointer",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
  };

  return (
    <div className="product-page">
      <div className="product-image-section">
        <img
          src={product.image}
          alt={product.name}
          className="main-product-image"
        />
      </div>

      <div className="product-details-section">
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>

        <div className="product-pricing">
          <span className="current-price">${product.price}</span>
        </div>

        {product.countInStock > 0 ? (
          <p>{product.countInStock} items available in stock</p>
        ) : (
          <p style={{ color: "red" }}>Out of stock</p>
        )}

        <div className="add-to-cart-section">
          <div className="quantity-controls">
            <button
              onClick={decreaseQuantity}
              disabled={product.countInStock === 0 || quantity <= 0}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={increaseQuantity}
              disabled={
                product.countInStock === 0 || quantity >= product.countInStock
              }
            >
              +
            </button>
          </div>

          <button
            style={buttonStyles}
            disabled={quantity === 0}
            onClick={handleAddToCart}
          >
            🛒 Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewScreen;
