const express 					= require("express");
const mongoose 					= require("mongoose");
const passportLocalMongoose     = require("passport-local-mongoose"),
    LocalStrategy 				= require('passport-local');
const cookieSession 			= require('cookie-session');
const passport 					= require('passport');
const authRouth 				= require('./routes/authRoute');
const postRoutes 				= require('./routes/postRoutes');
const billingRoutes 			= require('./routes/billingRoutes');
const surveyRoutes 				= require('./routes/surveyRoutes');
const path 						= require('path');
const bodyParser 				= require('body-parser');
const keys 						=require("./config/keys");
								require('./models/user');
								require('./models/advert');
								require('./models/survey');
								require('./service/passport');
								require('./service/passportLocal');


mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const User = mongoose.model("user");

const app = express();

app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
}));


app.use(express.static('client/build'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));




app.use(passport.initialize());
app.use(passport.session());

authRouth(app)
billingRoutes(app)
surveyRoutes(app)
postRoutes(app)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const Port = process.env.PORT || 5000;
app.listen(Port)