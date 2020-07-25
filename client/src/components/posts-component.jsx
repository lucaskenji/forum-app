import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

import ErrorComponent from "./error-component";
import LoadingComponent from "./loading-component";

class PostsComponent extends Component {
	
	state = {
		postagens: [],
		status: "Carregando"
	};
	
	componentDidMount() {
				
		axios.get("http://localhost:8081/api/posts")
		.then((response) => {
			this.setState({postagens: response.data, status: "Pronto"});
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

						{
							this.props.loginData
							?
							<div>
								<form method="get" action="/newpost">
									<button className="btn btn-primary">Novo post</button>
								</form>
							</div>
							:
							<span/>
						}

						{ 
							this.state.postagens.length > 0
							?
							this.state.postagens.map((elem) => { return (
								<div className="card card-body mt-2" key={elem._id}>
									<Link to={"/posts/" + elem._id}><h5>{elem.titulo}</h5></Link>
									<small>por {elem.autor.username}</small>
								</div>
							)}) 
							:
							"Sem postagens."
						}
						
					</div>
				</div>
			);
			
		} else if (this.state.status === "Carregando") {
			
			return (<div className="container mt-4">
				<div className="card card-body">
					<LoadingComponent/>
				</div>
			</div>);
			
		} else {
			
			return (<div className="container mt-4">
				<div className="card card-body">
					<ErrorComponent errormsg="Ocorreu um erro durante o carregamento de posts."/>
				</div>
			</div>);
			
		}
	};
};

export default PostsComponent;