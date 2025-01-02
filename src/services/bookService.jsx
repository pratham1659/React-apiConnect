/* eslint-disable no-useless-catch */
import axios from "axios";

const API_URL = "http://localhost:8080/books";

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
    return response.data;
  } catch (error) {
    throw error;
  }
};
