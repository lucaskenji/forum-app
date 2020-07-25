const express = require('express');
const app = express();

const users_route = require("./routes/users");
const posts_route = require("./routes/posts");
const comments_route = require("./routes/comments");

const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./auth');
initializePassport(passport);

const PORTNUM = process.env.PORT || 8081;


// Configurações
app.use(
	session({
		secret: "random-string",
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/forum-app", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log("Conectado ao banco de dados");
}).catch(() => {
	console.log("Erro ao tentar conectar com o banco de dados");
});


// Rotas

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    
	if (err) { return res.redirect("http://localhost:3000/login/error=100"); }
	
    if (!user) { return res.redirect("http://localhost:3000/login/error=104"); }
	
    req.logIn(user, function(err) {
		
      if (err) { return res.redirect("http://localhost:3000/login/error=100"); }
	  
      return res.redirect("http://localhost:3000/");
	  
    });
	
  })(req, res, next);
});

app.get("/islogged/", (req, res) => {
	if (req.user) {
		return res.send(req.user);
	}
	return res.send(null);
})

app.get("/logout/", (req, res) => {
	req.logout();
	res.status(200).send("OK");
})

app.use("/api/users/", users_route);

app.use("/api/posts/", posts_route);

app.use("/api/comments/", comments_route);


// Iniciar servidor

app.listen(PORTNUM, () => {
	console.log("Servidor iniciado na porta " + PORTNUM);
})