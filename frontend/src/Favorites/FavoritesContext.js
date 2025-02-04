// src/contexts/FavoritesContext.js
import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      const productExists = prevFavorites.find(item => item._id === product._id);
      if (productExists) {
        return prevFavorites;
      }
      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(product => product._id !== productId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
