import axios from "axios";

const API_URL = "https://opentdb.com/api.php";
const CATEGORY_URL = "https://opentdb.com/api_category.php";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const fetchCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_URL);
    return response.data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchQuestions = async (category: string, difficulty: string) => {
  try {
    const response = await api.get("", {
      params: {
        amount: 10,
        type: "multiple",
        category,
        difficulty,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
