const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comentario = require("../models/Comentario");


router.get("/", (req, res) => {

	Comentario.find().lean().populate("autor").populate("postagem").then((comentarios) => {
		res.send(comentarios);
	}).catch(() => {
		res.status(404).send("Não foi possível recolher os comentarios do banco de dados.");
	})
	
});

router.get("/:id", (req, res) => {
	
	Comentario.findById(req.params.id).lean().populate("autor").populate("postagem").then((comentario) => {
		res.send(comentario);
	}).catch(() => {
		res.status(404).send("Não foi possível encontrar o comentario com o ID especificado.");
	})
	
})

router.get("/from/:id", (req, res) => {
	
	Comentario.find({postagem: req.params.id}).lean().populate("autor").populate("postagem").then((comentarios) => {
		res.send(comentarios);
	}).catch(() => {
		res.status(404).send("Houve um erro ao tentar encontrar os comentários com a postagem especificada.");
	})
	
})

router.post("/", (req, res) => {
	
	const novoComment = {
		texto: req.body.texto,
		autor: req.body.autor,
		postagem: req.body.postagem
	}
	
	new Comentario(novoComment).save().then((comentario) => {
		res.send(comentario);
	}).catch((err) => {
		res.send(err);
	})
	
});

router.put("/:id", (req, res) => {
	
	Comentario.findOne({_id: req.params.id}).then((comentario) => {
		
		comentario.texto = req.body.texto;
		comentario.autor = req.body.autor;
		comentario.postagem = req.body.postagem;
		
		comentario.save().then((novocomentario) => {
			res.send(novocomentario);
		}).catch((err) => {
			res.send(err);			
		});		
		
	}).catch((err) => {
		res.send(err);
	})
	
});

router.delete("/:id", (req, res) => {
	
	Comentario.findOneAndDelete({_id: req.params.id}).then((comentario) => {
		res.send(comentario);
	}).catch((err) => {
		res.send(err);
	});
	
});


module.exports = router;