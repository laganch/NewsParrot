const mongoose 		= require("mongoose");

const advertSchema = new mongoose.Schema({
	name:String,
	link:String,
	image:String,
	type:String,
	created: {type:Date, default:Date.now},
	_user:{type: mongoose.Schema.Types.ObjectId, ref:'user'}
	})

mongoose.model("adverts", advertSchema);