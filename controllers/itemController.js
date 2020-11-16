exports.getItemById = function (request, response) {
    response.send(`Todo ${request.params.id}`);
};
exports.deleteItemById = function (request, response) {
    response.send(`Todo ${request.params.id}`);
};
exports.putItemById = function (request, response) {
    response.send(`Todo ${request.params.id}`);
};


exports.getItems = function (request, response) {
    response.send("Задачи");
};
exports.postItems = function (request, response) {
    response.send("Задачи");
};
