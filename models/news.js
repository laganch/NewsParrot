const mongoose 		= require("mongoose");

const surveySchema = new mongoose.Schema({
	title:String,
	body:String,
	category:String,
	view:{type:Number, default:0},
	created: {type:Date, default:Date.now},
	like:{type:Number, default:0},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"comments"
		}
	],	
	_user:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"user"
		}
	],	
	images:[],
	video:[]
	})

mongoose.model("news", surveySchema);