module.exports.getItemById = function (request, response) {
    response.send(`get Todo ${request.params.id}`);
};
module.exports.deleteItemById = function (request, response) {
    response.send(`delete Todo ${request.params.id}`);
};
module.exports.putItemById = function (request, response) {
    response.send(`put Todo ${request.params.id}`);
};


module.exports.getItems = function (request, response) {
    response.send("get Задачи");
};
module.exports.postItems = function (request, response) {
    response.send("post Задачи");
};
