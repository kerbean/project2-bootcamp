var db = require("../models");
const { SHA3 } = require('sha3');
const hash = new SHA3(512);

//START - Passport JS
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')
//END - Passport JS

console.log(passport)

module.exports = function (app) {

    const LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize())



    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.post('/login', passport.authenticate('local'), (req, res, next) => {
        console.log("Logged in!");
        res.send("WORKS!")
    });

    passport.use(new LocalStrategy(
        (username, password, done) => {
            if (username === 'test@gmail.com' && password === '1234') {
                return done(null, { username: 'test@gmail.com' });
            } else {
                return done(null, false);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        done(null, { username: username });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/login');
        }
    }

    // passport.use(new LocalStrategy({
    //     usernameField: 'user_username',
    //     passwordField: 'user_password'
    // },
    //     function (username, password, done) {
    //         if (!password) {
    //             hash.update(password);
    //         }
    //         db.Users.findOne(
    //             {
    //                 where: {
    //                     user_username: username
    //                 }
    //             },
    //             function (err, user) {
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 if (!user) {
    //                     return done(null, false, { message: 'Incorrect username.' });
    //                 }
    //                 if (!user.validPassword(password)) {
    //                     return done(null, false, { message: 'Incorrect password.' });
    //                 }
    //                 console.log("HASH HERE:" + hash.digest('hex'));
    //                 // if (user.user_password != hash.digest('hex')) {
    //                 //     return done(null, false, { message: 'Incorrect password.' });
    //                 // }
    //                 return done(null, user);
    //             });
    //     }
    // ));

    // app.use(passport.initialize());
    // app.use(passport.session());

    // // passport.serializeUser((user, done) => done(null, user.user_username));
    // // passport.deserializeUser((id, done) => {
    // //     return done(null, )
    // // });


    // app.post('/login', passport.authenticate('local'),
    //     // {
    //     //     successRedirect: "/home",
    //     //     failureRedirect: '/login',
    //     //     failureFlash: true
    //     // }),
    //     function (req, res) {
    //         console.log("I reached here.")
    //         //req.body.username

    //         // If this function gets called, authentication was successful.
    //         // `req.user` contains the authenticated user.

    //         //res.redirect('/users/' + req.user.username);
    //         res.json({ res });
    //     });


    // app.get("/user=:user", function (req, res) {
    //     db.Logs.findAll({
    //         where: {
    //             UserId: req.params.user
    //         }
    //     }).then(function (result) {
    //         res.json(result);
    //     });
    // });

    // app.get("/api/category=:category", function (req, res) {
    //     db.Logs.findAll({
    //         where: {
    //             logs_category: req.params.category
    //         }
    //     }).then(function (result) {
    //         res.json(result);
    //     });
    // });

    // app.post("/additem", function (req, res) {
    //     db.Logs.create({
    //         logs_name: req.body.logs_name,
    //         logs_category: req.body.logs_category,
    //         logs_price: req.body.logs_price,
    //         logs_currency: req.body.logs_currency
    //     }).then(function (result) {
    //         res.json(result);
    //     });
    // });




    // app.post("/register", async (req, res) => {

    //     hash.update(req.body.user_password);
    //     let hashpash = await hash.digest('hex');

    //     db.Users.create({
    //         user_username: req.body.user_username,
    //         user_password: hashpash,
    //         user_name: req.body.user_name
    //     }).then(function (result) {
    //         res.json(result);
    //         //res.redirect('/home);
    //     });
    // });

    // app.post("/addcategory", function (req, res) {
    //     db.Users.create({
    //         category_name: req.body.category_name
    //     }).then(function (result) {
    //         res.json(result);
    //     });
    // });

    // app.delete("/delitem=:id", function (req, res) {
    //     db.Logs.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //         .then(function (result) {
    //             res.json(result);
    //         });
    // });

    // app.put("/upditem", function (req, res) {
    //     db.Logs.update({
    //         logs_name: req.body.logs_name,
    //         logs_category: req.body.logs_category,
    //         logs_price: req.body.logs_price,
    //         logs_currency: req.body.logs_currency
    //     }, {
    //         where: {
    //             id: req.body.id
    //         }
    //     })
    //         .then(function (result) {
    //             res.json(result);
    //         });
    // });


};
