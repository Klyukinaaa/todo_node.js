const db = require("../models/index");
const User = db.user;

module.exports.login = function (request, response) {
    response.status(200).json({
        login: {
            email: request.body.email,
            password: request.body.password
        }
    })
};

module.exports.register = function (request, response) {

    if (!request.body) return response.sendStatus(400);

    const email = request.body.email;
    const password = request.body.password;
    User.create({
        email: email,
        password: password
    }).then(() => {
        console.log('User created');
    }).catch(err => console.log(err));
};


