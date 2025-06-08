const express = require("express");
const cors = require("cors");
const generateBook = require("./generateBook");
const seedrandom = require("seedrandom");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 10000;
const { fakerES } = require("@faker-js/faker");
const { fakerEN } = require("@faker-js/faker");
const { fakerKO } = require("@faker-js/faker");
const fakerMap = {
  en: fakerEN,
  ko: fakerKO,
  es: fakerES,
};
app.use(
  cors({
    origin: "https://task5-1-3plu.onrender.com",
  })
);
app.use(express.json());

app.get("/api/books", (req, res) => {
  try {
    const {
      seed = "default",
      language = "en",
      likes = "0",
      review = "0",
      amount = 20,
      offset = 0,
    } = req.query;
    const offsetNum = parseInt(offset);
    const likesNum = parseFloat(likes);
    const reviewsNum = parseFloat(review);
    const faker = fakerMap[language];
    const combinedSeed = seed + "_" + language;
    const rng = seedrandom(combinedSeed);
    const seedInt = Math.floor(rng() * 1000000);
    faker.seed(seedInt);
    const books = Array.from({ length: parseInt(amount) }, (_, i) =>
      generateBook(
        offsetNum + i + 1,
        faker,
        likesNum,
        reviewsNum,
        seedInt,
        language
      )
    );
    res.json(books);
  } catch (error) {
    console.error("Error while generating books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
