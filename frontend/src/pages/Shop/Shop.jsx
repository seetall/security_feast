import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/productServices';
import './Shop.css';
import Navbar from '../../components/navbar/Navbar';
import { FaHeart } from 'react-icons/fa';
import { FavoritesContext } from '../../Favorites/FavoritesContext';

const Shop = () => {
  const navigate = useNavigate();
  const { addToFavorites } = useContext(FavoritesContext); // Use FavoritesContext
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data.products);
  };

  const handleAddToFavorites = (product) => {
    addToFavorites(product);
    console.log(`Added ${product.name} to favorites`);
    navigate('/favorites'); // Navigate to the favorites page
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Function to truncate description to 50 characters
  const truncateDescription = (description) => {
    if (description.length > 50) {
      return description.slice(0, 50) + '...'; // Truncate after 50 characters and add ellipsis
    }
    return description;
  };

  return (
    <div className="shop">
      <Navbar />
      <div className="main-content">
        <div className="product-list">
          {currentProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={`http://localhost:5000${product.image}`} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">
                  {truncateDescription(product.description)} {/* Display truncated description */}
                </p>
                <div className="price">Rs {product.price}</div>
                <div className="product-buttons">
                  <Link to={`/products/${product._id}`} className="buy-now">Buy Now</Link>
                  <button className="add-to-favorites" onClick={() => handleAddToFavorites(product)}>
                    <FaHeart /> {/* Heart icon */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
