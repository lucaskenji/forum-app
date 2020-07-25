import React, {Component} from "react";
import axios from "axios";

import LoadingComponent from "./loading-component";
import ErrorComponent from "./error-component";

class CommentFormComponent extends Component {
	state = {
		formStatus: "espera"
	}
	
	enviarComentario(event) {
		this.setState({formStatus: "carregando"});
		
		const formularioJsx = event.target;
				
		axios.post("http://localhost:8081/api/comments", {
			texto: formularioJsx.texto.value,
			autor: formularioJsx.autor.value,
			postagem: formularioJsx.postagem.value
		})
		.then((resposta) => {
			this.setState({formStatus: "enviado"});
		})
		.catch((erro) => {
			this.setState({formStatus: "erro"});
		})
	}
	
	render() {
		if (this.state.formStatus === "espera") {
			return (
					<form onSubmit={(event) => {event.preventDefault(); this.enviarComentario(event)}}>
						<textarea name="texto" className="form-control" placeholder="Adicionar um comentário..."></textarea>
						<button type="submit" className="btn btn-primary mt-2">Enviar</button>
						<input type="hidden" name="autor" value={this.props.state.loginData._id} />
						<input type="hidden" name="postagem" value={this.props.postid} />
					</form>
				
			);
		} else if (this.state.formStatus === "carregando") {
			return (
				<LoadingComponent/>
			);
		} else if (this.state.formStatus === "enviado") {
			return (
				<span>
					{window.location.reload()}
				</span>
			);
		} else {
			return (
				<ErrorComponent errormsg="Ocorreu um erro ao enviar o comentário. Tente atualizar a página."/>
			);
		}
	}
}

export default CommentFormComponent;