import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Styles/ShoppingItemCard.css'; 

const ShoppingItemCard = ({ imageUrl, title, price}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("./product");
  };

  return (
    <div className="shopping-item-card" onClick={handleCardClick}>
      <img src={imageUrl} alt={title} className="product-image" />
      <div>
        <h5 className="product-title">{title}</h5>
        <div className="price-container">
          <span
            className={`original-price`}
          >
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingItemCard;
