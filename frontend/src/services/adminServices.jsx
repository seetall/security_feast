import axios from "axios";

const API_URL = "http://localhost:5000/api/admin"; // Replace with your backend API URL

export const promoteToAdmin = async (userId) => {
  try {
    const response = await axios.put(`${API_URL}/promote/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    throw error;
  }
};

export const demoteToUser = async (userId) => {
  try {
    const response = await axios.put(`${API_URL}/demote/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error demoting user to user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
