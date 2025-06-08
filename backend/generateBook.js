const seedrandom = require("seedrandom");

function generateBook(id, faker, likesNum, reviewsNum, seedInt, language) {
  const titleTemplates = [
    () =>
      `${capitalizeFirstLetter(faker.word.adjective())} ${faker.word.noun()}`,
    () => `${capitalizeFirstLetter(faker.word.noun())} ${faker.word.noun()}`,
    () => `${faker.person.firstName()} ${faker.word.noun()}`,
  ];

  const combinedSeed = `${seedInt}_${language}_book_${id}_reviews`;
  const localRng = seedrandom(combinedSeed);
  const localSeedInt = Math.floor(localRng() * 1000000);
  reviewsFaker = faker;
  reviewsFaker.seed(localSeedInt);
  const publishedDate = faker.date.between({
    from: "1990-01-01",
    to: "2023-12-31",
  });
  return {
    id,
    isbn: faker.number
      .int({ min: 1000000000000, max: 9999999999999 })
      .toString(),
    title: faker.helpers.arrayElement(titleTemplates)(),

    author: faker.person.fullName(),
    publisher: `${faker.company.name()}, ${publishedDate.getFullYear()}`,

    likes: getProbabilisticValue(likesNum, localRng),
    image: faker.image.urlPicsumPhotos({
      width: 150,
      height: 150,
      blur: false,
    }),
    format: faker.book.format(),

    reviews: Array.from(
      { length: getProbabilisticValue(reviewsNum, localRng) },
      () => ({
        text: `${reviewsFaker.lorem.sentence()}${reviewsFaker.internet.emoji()}`,
        author: reviewsFaker.person.fullName(),
      })
    ),
  };
}
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function getProbabilisticValue(value, rng) {
  const intPart = Math.floor(value);
  const decimalPart = value - intPart;
  return rng() < decimalPart ? intPart + 1 : intPart;
}
module.exports = generateBook;
