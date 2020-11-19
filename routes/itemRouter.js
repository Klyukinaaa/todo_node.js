const express = require("express");
const itemController = require("../controllers/itemController.js");
const passport = require("passport");

const itemsRouter = express.Router(); // определяем роутеры

// определяем маршруты и их обработчики внутри роутера itemsRouter
// модуль позволяет вам аутентифицировать конечные точки с помощью веб-токена JSON
itemsRouter.get("/:id", passport.authenticate("jwt", { session: false },), itemController.getItemById);
itemsRouter.delete("/:id", itemController.deleteItemById);
itemsRouter.put("/:id", itemController.putItemById);

itemsRouter.get("/", itemController.getItems);
itemsRouter.post("/", itemController.postItems);

module.exports = itemsRouter;
