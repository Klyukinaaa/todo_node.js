const keys = require("../config/keys");
const JwtStrategy = require('passport-jwt').Strategy, //переменная
      ExtractJwt = require('passport-jwt').ExtractJwt; //функция
const db = require("../models/index");
const User = db.user;

let options = {}

//берем токен, который будет нах-ся в хедер
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//значение секретного ключа
options.secretOrKey = keys.jwt;

//защита роутов (роутер может запрашивать только тот, у кого есть валидный токен)
module.exports = passport => {
    passport.use(new JwtStrategy(options, async function (jwt_payload, done) {
        try {
            const user = await User.findOne({id: jwt_payload.sub});
            if (user) { //пользователь найден в бд
                return done(null, user);
            } else {
                return done(null, false);
                //пользователь не найдем, не будем добавлять данные к запросу
            }
        } catch (e) {
            console.log(e)
        }
    }));
}
