const keys = require("../config/keys") 
const isloggedin = require("../middleWare/requiredFunction")
const mongoose = require('mongoose');
const stripe = require('stripe')(keys.reactSecretKey) 
const User = require("../models/user")
					require('../models/witdrawal.js');

const Witdrawal = mongoose.model("witdrawal");


module.exports = app =>{
	
	app.post('/auth/stripe', isloggedin, async (req, res)=>{
	const charges =	await stripe.charges.create({
			amount:12000,
			description:'charge for your purchase',
			currency:'usd',
			source:req.body.id
		})
		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user)
		console.log(user)
	});
	app.post('/auth/payment', (req, res)=>{
		req.user.payment = true;
		req.user.save()
	})
	app.post('/auth/survey/witdrawal/', (req, res)=>{
		const {amount} = req.body;
		const witdraw = new Witdrawal({
			amount, 
			_user:req.user.id
		})
		witdraw.save();
		req.user._witdrawal.push(witdraw);
		req.user.save()
	})
};