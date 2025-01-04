/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "/books";
// const LOCAL_URL = "http://localhost:8080/books";

export const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const submitBook = async (formData) => {
  // Convert genres string into an array
  const genresArray = formData.genres.split(",").map((genre) => genre.trim());
  const dataToSubmit = { ...formData, genres: genresArray };

  try {
    const response = await axios.post(API_URL, dataToSubmit);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch book by ID
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("Fetched book by ID:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error.message);
    throw new Error(`Failed to fetch book with ID ${id}`);
  }
};

// Update a book
export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, bookData);
    console.log("Updated book:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error.message);
    throw new Error(`Failed to update book with ID ${id}`);
  }
};

// Function to delete a book by ID
export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleteing book with ID ${id}:`, error.message);
    throw new Error(`Failed to delete book with ID ${id}`);
  }
};
