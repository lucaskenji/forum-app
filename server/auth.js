const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Usuario = require('./models/Usuario');


function initialize(passport) {
	passport.use(
		new LocalStrategy({ passwordField: "senha"}, (username, password, done) => {
			Usuario.findOne({"username": username})
			.then((usuario) => {
				
				if (!usuario) {
					return done(null, false);
				}
				
				bcrypt.compare(password, usuario.senha)
				.then((result) => {
					if (result == true) {
						
						done(null, usuario);
						
					} else {
						
						done(null, false);
						
					}
				})
				.catch((err) => {
					throw err;
				})
				
			})
			.catch((err) => {
				console.log(err);
			})
		})
	);
	
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	
	passport.deserializeUser((id, done) => {
		Usuario.findById(id)
		.then((user) => {
			return done(null, user);
		})
		.catch((err) => {
			return done(err, false);
		})
	})
	
}

module.exports = initialize;