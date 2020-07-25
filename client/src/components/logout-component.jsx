import React from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import LoadingComponent from "./loading-component";
import ErrorComponent from "./error-component";

class LogoutComponent extends React.Component {
	
	state = {
		status: 0
	}
	
	componentDidMount() {
		axios.get("http://localhost:8081/logout/", {withCredentials:true})
		.then((response) => {
			this.setState({status: 1});
		})
		.catch((err) => {
			this.setState({status: 2});
		});
	}
	
	render() {
		
		if (this.state.status == 0) {
			return (<LoadingComponent/>);
		} else if (this.state.status == 1) {
			return (<div><Redirect to="/" /></div>);
		} else {
			return (<ErrorComponent errormsg="Um erro interno ocorreu. Tente atualizar a página."/>);
		}
		
	}
	
};

export default LogoutComponent;