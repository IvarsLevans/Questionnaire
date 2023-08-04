// api.js
import axios from "axios";

const BASE_URL = "https://opentdb.com/api.php";

export const fetchQuizData = async (category, difficulty, amount = 10) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        amount,
        category,
        difficulty,
        type: "multiple",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get("https://opentdb.com/api_category.php");
    return response.data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
