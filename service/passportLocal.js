const passportLocalMongoose    = require("passport-local-mongoose"),
    passport 				= require('passport'),
    mongoose 				= require("mongoose"),
    LocalStrategy = require('passport-local').Strategy;


const User = mongoose.model("user");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// passport.use(new LocalStrategy((username, password, done) => {
//       User.findOne({ username: username }, (err, user) => {
//         console.log('User ' + username + ' attempted to log in.');
//         if (err) return done(err);
//         if (!user) return done(null, false);
//         if (password !== user.password) return done(null, false);
//         return done(null, user);
//       });
//     })); 
