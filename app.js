const express = require("express");
const itemsRouter = require("./routes/itemRouter.js");
const homeRouter = require("./routes/homeRouter.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("usersdb2", "root", "123456", {
    dialect: "postgres",
});

const app = express();

// сопоставляем роутер с конечной точкой
app.use("/items", itemsRouter);
app.use("/", homeRouter);

// обработка ошибки 404
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(3000);
