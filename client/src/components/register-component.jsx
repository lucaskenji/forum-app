import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import {Redirect} from "react-router-dom";

import FormRegisterComponent from "./formregister-component";
import ResultRegisterComponent from "./resultregister-component";

class RegisterComponent extends Component {

	state = {
		registerSuccess: false,
		message: "",
		attemptingRegister: false
	}

	constructor(props) {
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentDidMount() {
		this.props.checkLogin();	
	}

	onFormSubmit(event) {
		this.setState({attemptingRegister: true});
		const userName = event.target.username.value;
		const password = event.target.senha.value;
		
		axios.post("http://localhost:8081/api/users/", {username: userName, senha: password})
		.then(() => {
			this.setState({registerSuccess: true, attemptingRegister: false});
		})
		.catch((err) => {
			if (!err.response) {
				this.setState({message: "Ocorreu um erro ao tentar conectar com o servidor. Tente novamente mais tarde.",
							   attemptingRegister: false});
				return;
			}
			if (err.response.status == 400) {
				this.setState({message: "O usuário digitado já possui uma conta no sistema.",
							   attemptingRegister: false});
			} else {
				this.setState({message: "Um erro ocorreu durante o registro. Por favor tente novamente.",
							   attemptingRegister: false});
			}
		});
	}
	
	render() {
		if (!this.props.loginData) {
			if (!this.state.registerSuccess) {
				return (
					<FormRegisterComponent onFormSubmit={this.onFormSubmit} state={this.state}  />
				);
			} else {
				return (
					<ResultRegisterComponent/>
				);
			}
		} else {
			return (
				<Redirect to="/" />
			);
		}
	}
}

export default RegisterComponent;