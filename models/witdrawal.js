const mongoose 		= require("mongoose");

const witdrawalSchema = new mongoose.Schema({
	amount:String,
	created: {type:Date, default:Date.now},
	_user:[{type: mongoose.Schema.Types.ObjectId, ref:'user'}],
	purpose:String,
	approval:{type:Boolean, default:false}
	})

mongoose.model("witdrawal", witdrawalSchema);