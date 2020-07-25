const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostagemSchema = new Schema({
	titulo: {
		type: String,
		required: true
	},
	texto: {
		type: String,
		required: true
	},
	autor: {
		type: Schema.Types.ObjectId,
		ref: "usuarios"
	}
});

module.exports = mongoose.model("postagens", PostagemSchema);