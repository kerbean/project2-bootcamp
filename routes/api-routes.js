var db = require("../models");
const { SHA3 } = require('sha3');
const hash = new SHA3(512);

//START - Passport JS
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
//END - Passport JS

module.exports = function (app) {

    app.get("/api/budget/:user", function (req, res) {
        db.Logs.findAll({
            where: {
                UserId: req.params.user
            }
        }).then(function (result) {
            res.json(result);
        });
    });

    app.get("/api/budget/category=:category", function (req, res) {
        db.Logs.findAll({
            where: {
                logs_category: req.params.category
            }
        }).then(function (result) {
            res.json(result);
        });
    });

    app.post("/api/budget", function (req, res) {
        db.Logs.create({
            logs_name: req.body.logs_name,
            logs_category: req.body.logs_category,
            logs_price: req.body.logs_price,
            logs_currency: req.body.logs_currency
        }).then(function (result) {
            res.json(result);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'user_username',
        passwordField: 'user_password'
    },
        function (username, password, done) {
            db.Users.findOne({ user_username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    ));

    app.post('/login',
        passport.authenticate('local'),
        function (req, res) {

            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.

            //res.redirect('/users/' + req.user.username);
            res.json({ result: "yay" });
        });

    app.post("/api/users", function (req, res) {

        hash.update(req.body.user_password);
        let hashpash = hash.digest('hex');

        db.Users.create({
            user_username: req.body.user_username,
            user_password: hashpash,
            user_name: req.body.user_name
        }).then(function (result) {
            res.json(result);
        });
    });

    app.post("/api/category", function (req, res) {
        db.Users.create({
            category_name: req.body.category_name
        }).then(function (result) {
            res.json(result);
        });
    });

    app.delete("/api/budget/:id", function (req, res) {
        db.Logs.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (result) {
                res.json(result);
            });
    });

    app.put("/api/budget", function (req, res) {
        db.Logs.update({
            logs_name: req.body.logs_name,
            logs_category: req.body.logs_category,
            logs_price: req.body.logs_price,
            logs_currency: req.body.logs_currency
        }, {
            where: {
                id: req.body.id
            }
        })
            .then(function (result) {
                res.json(result);
            });
    });


};
