import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

import LoadingComponent from "./loading-component";
import ErrorComponent from "./error-component";

class PostFormComponent extends Component {
	state = {
		formStatus: "espera"
	}
	
	componentDidMount() {
		this.props.checkLogin();
	}
	
	enviarPostagem(event) {
		this.setState({formStatus: "carregando"});
		
		const formularioJsx = event.target;
					
		axios.post("http://localhost:8081/api/posts", {
			titulo: formularioJsx.titulo.value,
			texto: formularioJsx.texto.value,
			autor: formularioJsx.autor.value
		})
		.then((resposta) => {
			this.setState({formStatus: "enviado"});
		})
		.catch((erro) => {
			this.setState({formStatus: "erro"});
		})
	}
	
	render() {
		if (this.props.loginData) {
			if (this.state.formStatus === "espera") {
				return (
					<div className="container mt-2">
						<div className="card card-body mt-2">
							<form onSubmit={(event) => {event.preventDefault(); this.enviarPostagem(event)}}>
								<input required type="text" name="titulo" className="form-control" placeholder="Título da postagem" />
								<textarea required name="texto" className="form-control mt-2" placeholder="Texto da postagem"></textarea>
								<button type="submit" className="btn btn-primary mt-2">Enviar</button>
								<input type="hidden" name="autor" value={this.props.loginData._id} />
							</form>
						</div>
					</div>
				);
			} else if (this.state.formStatus === "carregando") {
				return (
					<div className="container mt-2">
						<div className="card card-body mt-2">
							<LoadingComponent/>
						</div>
					</div>
				);
			} else if (this.state.formStatus === "enviado") {
				return (
					<Redirect to="/" />
				);
			} else {
				return (
					<div className="container mt-2">
						<div className="card card-body mt-2">
							<ErrorComponent errormsg="Ocorreu um erro ao enviar a postagem. Tente atualizar a página."/>
						</div>
					</div>
				);
			}
		} else {
			return (
				<div className="container mt-2">
					<div className="card card-body mt-2">
						Você precisa estar logado para postar.
					</div>
				</div>
			)
		}
	}
}

export default PostFormComponent;