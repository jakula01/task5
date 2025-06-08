import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchBooks = async (
  seed,
  language,
  likes,
  review,
  amount,
  offset
) => {
  const response = await axios.get(`${API_URL}/books`, {
    params: { seed, language, likes, review, amount, offset },
  });
  return response.data;
};
