import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../Components/ShoppingItemCard";
import ImageSlider from "../Components/ImageSlider";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3 * 6;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        console.log("data:", data);
        setProducts(data);
        setFilteredProducts(data);
        extractCategories(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const extractCategories = (products) => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const currentItems = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(0);

    const searchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    setFilteredProducts(searchedProducts);
  };

  return (
    <div>
      <ImageSlider />

      <div style={filterSearchContainerStyle}>
        <div style={filterContainerStyle}>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={filterSelectStyle}
          >
            <option value="">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={searchBarStyle}
          />
        </div>
      </div>

      <div style={gridStyle}>
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id)}
            >
              <CardComponent
                imageUrl={product.image}
                title={product.name}
                price={product.price}
              />
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

const filterSearchContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "85px 80px 0 80px",
  gap: "20px",
};

const filterContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const filterLabelStyle = {
  marginRight: "10px",
  fontSize: "18px",
  fontWeight: "bold",
};

const filterSelectStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const searchContainerStyle = {
  width: "300px",
};

const searchBarStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "4px",
  fontSize: "16px",
  border: "1px solid #ccc",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px",
  padding: "20px",
  width: "100%",
  maxWidth: "900px",
  margin: "15px auto",
};

export default HomeScreen;
