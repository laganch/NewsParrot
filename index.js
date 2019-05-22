const express 			= require("express");
const mongoose 			= require("mongoose");
const passportLocalMongoose    = require("passport-local-mongoose"),
    LocalStrategy = require('passport-local');
const cookieSession 	= require('cookie-session');
const passport 			= require('passport');
const authRouth 		= require('./routes/authRoute');
const postRoutes 		= require('./routes/postRoutes');
const billingRoutes 		= require('./routes/billingRoutes');
const surveyRoutes 		= require('./routes/surveyRoutes');
const bodyParser 		= require('body-parser');
// const expressSession     = require("express-session");
const keys 				=require("./config/keys");
						require('./models/user');
						require('./models/advert');
						require('./models/survey');
						require('./service/passport');
						require('./service/passportLocal');


mongoose.connect("mongodb://laganch:wisdom4190@ds119662.mlab.com:19662/cryptoapp");
const User = mongoose.model("user");

const app = express();

app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
}));

// app.use(expressSession({
//     secret: "this will help me out",
//     resave: true,
//     saveUninitialized: true
// }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));




app.use(passport.initialize());
app.use(passport.session());

authRouth(app)
billingRoutes(app)
surveyRoutes(app)
postRoutes(app)



const path = require('path');
app.use(express.static(path.join(__dirname,'client/build')));

app.get('*', (req, res)=>{
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


const Port = process.env.PORT || 5000;
app.listen(Port)