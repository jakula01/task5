import axios from "axios";

const API_URL = "http://localhost:4000/api/books";

export const fetchBooks = async (
  seed,
  language,
  likes,
  review,
  amount,
  offset
) => {
  const response = await axios.get(API_URL, {
    params: { seed, language, likes, review, amount, offset },
  });
  return response.data;
};
