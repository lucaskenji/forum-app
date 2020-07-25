import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Redirect} from "react-router-dom";
import ErrorComponent from "./error-component";

class LoginComponent extends Component {
	
	state = {
		status: 0
	}
	
	componentDidMount() {
		this.props.checkLogin()
	}
	
	render() {
		if (!this.props.loginData) {
			return (
				<div className="container">
					<div className="card card-body mt-4">
						{ this.props.match ? <ErrorComponent errorid={this.props.match.params.errorid}/> : <span/> }
					
						<h1>Login</h1>
						
						<form method="post" action="http://localhost:8081/login/">
							<input required type="text" name="username" className="form-control mt-2" placeholder="Nome de usuário"/>
							<input required type="password" name="senha" className="form-control mt-2" placeholder="Senha"/>
							<button type="submit" className="btn btn-primary mt-4">Entrar</button>
						</form>
					</div>
				</div>
			);
		} else {
			return (<Redirect to="/" />);
		}
	}
}

export default LoginComponent;