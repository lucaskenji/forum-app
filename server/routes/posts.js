const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Postagem = require("../models/Postagem");


router.get("/", (req, res) => {

	Postagem.find().lean().populate("autor").then((postagens) => {
		res.send(postagens);
	}).catch(() => {
		res.status(404).send("Não foi possível recolher as postagens do banco de dados.");
	})
	
});

router.get("/:id", (req, res) => {
	
	Postagem.findById(req.params.id).lean().populate("autor").then((postagem) => {
		res.send(postagem);
	}).catch(() => {
		res.status(404).send("Não foi possível encontrar a postagem com o ID especificado.");
	})
	
})

router.post("/", (req, res) => {
	
	const novoPost = {
		titulo: req.body.titulo,
		texto: req.body.texto,
		autor: req.body.autor
	}
	
	new Postagem(novoPost).save().then((postagem) => {
		res.send(postagem);
	}).catch((err) => {
		res.send(err);
	})
	
});

router.put("/:id", (req, res) => {

	Postagem.findOne({_id: req.params.id}).then((postagem) => {
		
		postagem.titulo = req.body.titulo;
		postagem.texto = req.body.texto;
		postagem.autor = req.body.autor;
		
		postagem.save().then((novapostagem) => {
			res.send(novapostagem);
		}).catch((err) => {
			res.send(err);			
		});		
		
	}).catch((err) => {
		res.send(err);
	})
	
});

router.delete("/:id", (req, res) => {
	
	Postagem.findOneAndDelete({_id: req.params.id}).then((postagem) => {
		res.send(postagem);
	}).catch((err) => {
		res.send(err);
	});
	
});


module.exports = router;