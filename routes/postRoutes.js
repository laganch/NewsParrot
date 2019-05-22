const _ = require("lodash");
const Path = require("path-parser");
const { URL } =require("url");
const passport = require('passport');
const noCredits = require("../middleWare/requireCredit");
const mongoose = require('mongoose');
const isloggedin = require("../middleWare/requiredFunction");
const Mailer = require('../service/Mailer');
const surveyTemplate = require('../service/emailTemplate/surveyTemplate');
					require('../models/user.js');
					require('../models/news.js');
					require('../models/advert.js');
					require('../models/comments.js');

const User = mongoose.model("user");
const News = mongoose.model("news");
const Advert = mongoose.model("adverts");
const Comment = mongoose.model("comments");


module.exports = app =>{
	app.post("/auth/survey", function(req, res){
		const {name, address, recipients, number, city, type, anumber, bank, username, password, } = req.body;
        var newUser = new User({username: req.body.username});
            newUser.name =name
            newUser.recipients =recipients.split(',').map(email=>({email}))
            newUser.number =number
            newUser.city =city
            newUser.type =type
            newUser.anumber = anumber
            newUser.bank = bank
    User.register(new User(newUser), req.body.password, async function(err, user){
        if(err){ 
            console.log(err)
        }else{	
			passport.authenticate("local")(req, res, function(err){
				res.send(newUser)
        	})
        const mailer = new Mailer(newUser, surveyTemplate(newUser));
		try{
			await mailer.send();

		} catch(err){
			res.status(422)
		}

		}
    });
});
	app.post('/auth/surveydddd', async (req, res)=>{
		const {name, address, recipients, number, city, type, anumber, bank, username, password, } = req.body;

		const clients = new User({
			name, 
			address, 
			recipients:recipients.split(',').map(email=>({email})), 
			number, city, type, anumber, bank, username, password, _user:req.user.id,
			created: Date.now()
		});
		const mailer = new Mailer(clients, surveyTemplate(clients));
		try{
			await mailer.send();
			await clients.save();
			 req.user.credits -= 1;
			const user =await req.user.save()
			res.send(user);
		} catch(err){
			res.status(422)
		}
	})
	app.post('/auth/survey/postNews', async (req, res)=>{
		const {title, body, category, video, images } = req.body;
		 const news = new News({
			title, body, category, video, images, _user:req.user.id,
		});
			try{
				await news.save();
				res.send(news);
				req.user._post.push(news);
				req.user.save();
			}catch(err){
				res.status(422);
			}
	})
	app.post('/auth/survey/comment/:id', async (req, res)=>{
		const {body} = req.body;
		 const comments = new Comment({
			body, _user:req.user.name,
		});
		 comments.save();
		 News.findById(req.params.id, (err, found)=>{
		 	found.comments.push(comments)
		 	found.save();
		 })
	})
	app.post('/auth/advert', async (req, res)=>{
		const {name, link, image, type } = req.body;
		 const advert = new Advert({
			name, link, image, type, _user:req.user.id,
		});
			try{
				await advert.save();
				res.send(advert)
			}catch(err){
				res.status(422)
			}
	})
}
