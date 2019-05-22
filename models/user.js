const mongoose 		= require("mongoose");
const RecipientSchema = require('./Recipient');
const passportLocalMongoose   = require("passport-local-mongoose");



const userSchema = new mongoose.Schema({
	googleId:String,
	credits:{type:Number, default:0},
	name:String,
	created:Date,
	recipients:[RecipientSchema],
	payment:{type:Boolean, default:false},
	address:String,
	city:String,
	number:String,
	type:String,
	bank:String,
	anumber:String,
	username:String,
	password:String,
	image:String,
	discription:String,
	confirmed:{type: Boolean, default: false},
	_post:[{type: mongoose.Schema.Types.ObjectId, ref:'news'}],
	_witdrawal:[{type: mongoose.Schema.Types.ObjectId, ref:'witdrawal'}],
	_transfer:[{type: mongoose.Schema.Types.ObjectId, ref:'transfer'}],
	_advert:[{type: mongoose.Schema.Types.ObjectId, ref:'advert'}],
	_refferedUsers:[],
	reads:[],
	_clicks: Number,
	refferalID: String
	})

userSchema.plugin(passportLocalMongoose)


mongoose.model("user",userSchema);