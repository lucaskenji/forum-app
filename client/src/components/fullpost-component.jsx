import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

import ErrorComponent from "./error-component";
import LoadingComponent from "./loading-component";
import CommentFormComponent from "./commentform-component";
import CommentsComponent from "./comments-component";

class FullPostComponent extends Component {
	
	state = {
		postagem: [],
		status: "Carregando"
	};
	
	componentDidMount() {
	
		axios.get("http://localhost:8081/api/posts/" + this.props.match.params.postid)
		.then((response) => {
			this.setState({postagem: response.data, status: "Pronto"});
		})
		.catch(() => {
			this.setState({status: "Erro"});
		});
		this.props.checkLogin();

	};
	
	render() {
		if (this.state.status === "Pronto") {
			
			return (
				<div className="container mt-4">
					
					<div className="card card-body">

						<h3>{this.state.postagem.titulo}</h3>
						<small>por {this.state.postagem.autor.username}</small>
						<br/>
						<p>
							{this.state.postagem.texto}
						</p>
						
					</div>
					
					<CommentsComponent postid={this.props.match.params.postid} />
					
					{
						this.props.state.loginData
						?
						<div className="card card-body mt-4">
							<CommentFormComponent state={this.props.state} postid={this.props.match.params.postid} />
						</div>
						:
						<div className="alert alert-secondary mt-4">
							Crie uma conta para fazer um comentário.
						</div>
					}
					
				</div>
			);
			
		} else if (this.state.status === "Carregando") {
			
			return (<div className="container mt-4">
				<div className="card card-body">
					<LoadingComponent/>
				</div>
			</div>);
			
		} else {
			
			return (
				<div className="container mt-4">
					<ErrorComponent errormsg="Ocorreu um erro durante o carregamento do post."/>
				</div>
			);
			
		}
	};
};

export default FullPostComponent;