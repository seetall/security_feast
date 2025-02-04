import axios from "axios";

const API_URL = "http://localhost:5000/api/products"; // Replace with your backend API URL

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/create`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const removeProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing product:", error);
  }
};

export const updateProduct = async (productId, product) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
  }
};
