const mongoose 		= require("mongoose");

const transferSchema = new mongoose.Schema({
	amount:String,
	created: {type:Date, default:Date.now},
	_user:{type: mongoose.Schema.Types.ObjectId, ref:'user'},
	_reciepient:{type: mongoose.Schema.Types.ObjectId, ref:'user'},
	})

mongoose.model("transfer", transferSchema);