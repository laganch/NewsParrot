const _ = require("lodash");
const Path = require("path-parser");
const { URL } =require("url");
const passport = require('passport');
const mongoose = require('mongoose');
const isloggedin = require("../middleWare/requiredFunction");
const noCredits = require("../middleWare/requireCredit");
const Mailer = require('../service/Mailer');
const surveyTemplate = require('../service/emailTemplate/surveyTemplate');
					require('../models/clients.js');
					require('../models/user.js');
					require('../models/news.js');
					require('../models/advert.js');

const User = mongoose.model("user");
const News = mongoose.model("news");
const Advert = mongoose.model("adverts");


module.exports = app =>{
app.post("/auth/login", function (req, res, next) {
    passport.authenticate("local",
        {
            successRedirect: "/dashboard",
            failureRedirect: "/",
        })(req, res);
})
	app.get("/auth/survey", async (req, res)=>{
		const topics = await News.find({})

		res.send(topics)
	})
	app.get("/auth/survey/:id/", async (req, res)=>{
		const news = await News.findById(req.params.id).populate('comments').exec();
		res.send(news)
		try{
			User.findOne({_refferedUsers:req.params.id}, (err, found)=>{
					if (err) {

					}else{
						if (found) {
						}else{
							req.user._refferedUsers.push(req.params.id)
							req.user.credits +=20;
							req.user.save()
						}
					}
				})
			}
			catch(err){
				res.status(422)
			}

		
	})
	app.get("/auth/advert/left", async (req, res)=>{
		const advert = await Advert.find({});
		res.send(advert)
	})
	app.get("/auth/survey/category/:name/", async (req, res)=>{
		const category = await News.find({category:req.params.name});
		res.send(category)
	})
	app.get("/auth/survey/:id/:name/:name", (req, res)=>{
		res.send("thanks for registering you now login")
	})
	app.post("/auth/survey/webhook", async (req, res)=>{

	const p = new path("auth/survey/:clientId/:clientname/:choice");

	const events=  _.chain(req.body)
		.map(req.body, (event) => {
			const match = p.test(new URL(event.url).postname);
			if (match) {
				return {
					email: match.email, 
					clientId: match.clientId, 
					clientName:match.clientname, 
					choice: match.choice
					};
			}
		})
		.conpact(events)
		.uniqBy(compactEvents, 'email', 'clientId' )
		.value();


	})
}
