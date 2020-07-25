const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema({
	texto: {
		type: String,
		required: true
	},
	autor: {
		type: Schema.Types.ObjectId,
		ref: "usuarios"
	},
	postagem: {
		type: Schema.Types.ObjectId,
		ref: "postagens"
	},
	data: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("comentarios", ComentarioSchema);