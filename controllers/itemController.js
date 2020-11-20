const db = require("../models/index");
const Item = db.todo;
const errorHandler = require('../utils/errorHandler');

//список задач юзера
module.exports.getItems = async function (request, response) {
    try {
        //поиск по items
        const items = await Item.findAll({
            where: {
                user: request.user.id //поиск по юзеру
            }
        })
        console.log(request.user)
        response.status(201).json(items);
    } catch (err) {
        errorHandler(response, err)
    }
};

//создание новых задач
module.exports.create = function (request, response) {
    Item.create({
        user: request.user.id,
        task: request.body.task,
        completed: request.body.completed
    }).then((result) => {
        response.status(201).json(result);
    }).catch(err => errorHandler(response, err)); //обработать ошибку
};

//удалить задачу
module.exports.remove = function (request, response) {
    Item.destroy({
        where: {
            id: request.params.id
        }
    }).then(() => {
        response.status(201).json({
            message: "Задача была удалена."
        })
    }).catch(err => errorHandler(response, err)); //обработать ошибку
};

//обновить задачу
module.exports.update = function (request, response) {
    Item.update({
        task: request.body.task,
        completed: request.body.completed
    }, {
        where: {
            id: request.params.id
        }
    }).then((result) => {
        response.status(201).json(result);
    }).catch(err => errorHandler(response, err)); //обработать ошибку
};

