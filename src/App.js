import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";
const CATEGORIES_API_URL = "https://fakestoreapi.com/products/categories";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get(CATEGORIES_API_URL)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories: ", error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`${PRODUCTS_API_URL}/category/${selectedCategory}`)
        .then((response) => {
          setFilteredProducts(response.data);
        })
        .catch((error) => console.error("Error fetching products: ", error));
    } else {
      axios
        .get(PRODUCTS_API_URL)
        .then((response) => {
          setFilteredProducts(response.data);
        })
        .catch((error) => console.error("Error fetching products: ", error));
    }
  }, [selectedCategory]);

  const filterProducts = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <div className="filter-buttons">
        {categories.map((category) => (
          <button key={category} onClick={() => filterProducts(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="Product_Box">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const Product = ({ product }) => {
  const [isScaled, setIsScaled] = useState(false);

  const toggleScale = () => {
    setIsScaled(!isScaled);
  };

  const shortenText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div
      className={`product ${isScaled ? "scaled" : ""}`}
      onClick={toggleScale}
    >
      <div className="Product_Img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="Product_Info">
        <div>
          <h3>{shortenText(product.title, 15)}</h3>
        </div>
        <div>
          <p>Price: ${product.price}</p>
        </div>
        <div>
          <p>{shortenText(product.description, 50)}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
