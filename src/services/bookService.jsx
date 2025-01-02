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
