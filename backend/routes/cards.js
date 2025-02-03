const cardsRoute = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardsRoute.get("/cards", getCards);
cardsRoute.post("/cards", createCard);
cardsRoute.delete("/cards/:cardId", deleteCard);
cardsRoute.put("/cards/:cardId/likes", likeCard);
cardsRoute.delete("/cards/:cardId/likes", dislikeCard);

module.exports = cardsRoute;
