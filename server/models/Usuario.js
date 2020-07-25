const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsuarioSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	senha: {
		type: String,
		required: true
	}
});


module.exports = mongoose.model("usuarios", UsuarioSchema);