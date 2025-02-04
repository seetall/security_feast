import React, { useContext } from 'react';
import { FavoritesContext } from '../../Favorites/FavoritesContext';
import { FaTrashAlt } from 'react-icons/fa';
import "./Favorites.css";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useContext(FavoritesContext);

  const handleRemove = (productId) => {
    removeFromFavorites(productId);
  };

  const handleClearFavorites = () => {
    clearFavorites();
  };

  const calculateTotal = () => {
    return favorites.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  return (
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>Your favorites list is empty.</p>
      ) : (
        <div>
          <ul className="favorites-list">
            {favorites.map((product) => (
              <li key={product._id} className="favorites-item">
                <img src={`http://localhost:5000${product.image}`} alt={product.name} />
                <div className="favorites-item-info">
                  <h3>{product.name}</h3>
                  <div className="price">Rs {product.price}</div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(product._id)}
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="favorites-summary">
            <p>Total Value: Rs {calculateTotal()}</p>
            <button className="clear-favorites" onClick={handleClearFavorites}>Clear Favorites</button>
            {/* Add checkout or other buttons if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
