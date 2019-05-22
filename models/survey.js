const mongoose 		= require("mongoose");
const RecipientSchema = require('./Recipient');

const surveySchema = new mongoose.Schema({
	title:String,
	body:String,
	subject:String,
	recipients:[RecipientSchema],
	yes:{type:Number, default:0},
	no:{type:Number, default:0},
	_user:{type: mongoose.Schema.Types.ObjectId, ref:'user'},
	_comments:{type: mongoose.Schema.Types.ObjectId, ref:'comments'},
	created:Date,
	responded:Date
	})

mongoose.model("survey", surveySchema);