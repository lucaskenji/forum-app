const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = require("../models/Usuario");
const Postagem = require("../models/Postagem");
const bcrypt = require("bcryptjs");


// Funções

function validarRegistro(username, senha) {

	return new Promise((resolve, reject) => {
		if (!username || !senha) {
			return resolve(false);
		}
		
		Usuario.findOne({"username": username}).lean()
		.then((user) => {
			if (user) {
				return resolve(false);
			}
			return resolve(true);
		})
		.catch((err) => {
			return reject(err);
		});
	});
	
}


// Rotas

router.get("/", (req, res) => {

	Usuario.find().lean().then((usuarios) => {
		res.send(usuarios);
	}).catch(() => {
		res.status(404).send("Não foi possível encontrar os usuários.");
	});
	
});

router.get("/:id", (req, res) => {
	
	Usuario.findById(req.params.id).lean().then((user) => {
		res.send(user);
	}).catch(() => {
		res.status(404).send("Não foi possível encontrar o usuário com o ID especificado.");
	})
	
})

router.post("/", (req, res) => {
		
	validarRegistro(req.body.username, req.body.senha)
	.then((result) => {
	
		if (result == true) {
			
			bcrypt.genSalt(10, (err, salt) => {
				if (!err) {
					
					bcrypt.hash(req.body.senha, salt, (err, hash) => {	
						if (!err) {
							
								const novoUsuario = {
									username: req.body.username,
									senha: hash
								};
								
								new Usuario(novoUsuario).save().then((usuario) => {
									res.send(usuario);
								}).catch((err) => {
									res.status(500).send(err);
								})
								 
						} else {
							res.status(500).send("Algo de errado aconteceu durante o cadastro.");
						}
					})
					
				} else {
					res.status(500).send("Algo de errado aconteceu durante o cadastro.");
				}	
			})
			
		} else {
			res.status(400).send("Usuario e/ou senha invalidos.");
		}
	
	})
	.catch(() => {
		res.status(500).send("Algo de errado aconteceu durante o cadastro.");
	});
	
});

router.put("/:id", (req, res) => {

	const novosDados = {
		username: req.body.username,
		senha: req.body.senha
	}
	
	Usuario.findById(req.params.id).then((usuario) => {
		usuario.username = novosDados.username;
		usuario.senha = novosDados.senha;
		usuario.save().then(() => {
			res.send(usuario);
		}).catch((err) => {
			res.send(err);
		});
	}).catch((err) => {
		res.send(err);
	});
})

router.delete("/:id", (req, res) => {
	
	Usuario.findOneAndDelete({_id: req.params.id}).then((deletado) => {
		res.send(deletado);
	}).catch((err) => {
		res.send(err);
	});
	
})


module.exports = router;