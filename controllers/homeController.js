const jwt = require('jsonwebtoken');
const db = require("../models/index");
const keys = require("../config/keys");
const User = db.user;
const errorHandler = require("../utils/errorHandler");

module.exports.login = async function (request, response) {
    const email = request.body.email;
    const password = request.body.password;

    //получаем один объект по определенному критерию
    const candidate = await User.findOne({where: {email: email}});

    if (candidate) {
        //проверка пароля
        const passwordResult = password === candidate.password;
        if (passwordResult) {
            //генерация токена, пароли совпали
            const token = jwt.sign({ // метод авторизации
                email: candidate.email, //объект, который хотим зашифровать в токене
                id: candidate.id
            }, keys.jwt, {expiresIn: 60 * 60})

            response.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            //пароли не совпали
            response.status(401).json({
                message: "Пароли не совпадают. Попробуйте снова"
            })
        }
    } else {
        //пользователя нет, ошибка
        response.status(404).json({
            message: "Пользователь с таким email не найден"
        })
    }
};

module.exports.register = async function (request, response) {
    //email password
    const email = request.body.email;
    const password = request.body.password;

    //получаем один объект по определенному критерию
    const candidate = await User.findOne({where: {email: email}});

    if (candidate) {
        response.status(409).json({
            message: "Пользователь с указанным email уже существует!"
        })
    } else {
        //создание нового пользователя
        User.create({
            email: email,
            password: password
        }).then((result) => {
            response.status(201).json(result);
        }).catch(err => errorHandler(response, err)); //обработать ошибку
    }
}



