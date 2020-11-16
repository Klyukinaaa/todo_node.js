const express = require("express");
const itemController = require("../controllers/itemController.js");

const itemsRouter = express.Router(); // определяем роутеры

// определяем маршруты и их обработчики внутри роутера itemsRouter
itemsRouter.get("/:id", itemController.getItemById);
itemsRouter.delete("/:id", itemController.deleteItemById);
itemsRouter.put("/:id", itemController.putItemById);

itemsRouter.get("/", itemController.getItems);
itemsRouter.post("/", itemController.postItems);

module.exports = itemsRouter;
