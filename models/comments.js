const mongoose 		= require("mongoose");

const commentsSchema = new mongoose.Schema({
	body:String,
	created: {type:Date, default:Date.now},
	_user:[]
	})

mongoose.model("comments", commentsSchema);