import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import axios from "axios";

import NavbarComponent from "./components/navbar-component";
import PostsComponent from "./components/posts-component";
import PostFormComponent from "./components/postform-component";
import LoginComponent from "./components/login-component";
import RegisterComponent from "./components/register-component";
import FullPostComponent from "./components/fullpost-component";
import LogoutComponent from "./components/logout-component";

class App extends Component {
 	
	constructor(props) {
		super(props);
		this.checkLogin = this.checkLogin.bind(this);
	}
	
	state = {
		loginData: false
	}
	
	checkLogin() {
		
		axios.get("http://localhost:8081/islogged/", {withCredentials: true})
		.then((response) => {
			if (response.data && !this.state.loginData) {
				this.setState({loginData: response.data});
			} else if (!response.data && this.state.loginData) {
				this.setState({loginData: null});
			}
		})
		.catch((err) => {
			console.log(err);
		});
		
	}
	
	render() {
		return (
			<div>
				<Router>
					
					<NavbarComponent state={this.state} />
					
					<Switch>
						<Route exact path="/">
							<PostsComponent checkLogin={this.checkLogin} loginData={this.state.loginData} />
						</Route>
						
						<Route path="/newpost/">
							<PostFormComponent checkLogin={this.checkLogin} loginData={this.state.loginData} />
						</Route>
						
						<Route exact path="/login/">
							<LoginComponent checkLogin={this.checkLogin} loginData={this.state.loginData} />
						</Route>
						
						<Route 
							path="/login/error=:errorid"
							render={ ({match}) => <LoginComponent match={match} checkLogin={this.checkLogin} /> }
						/>
						
						<Route exact path="/register">
							<RegisterComponent checkLogin={this.checkLogin} loginData={this.state.loginData} />
						</Route>
						
						<Route path="/logout">
							<LogoutComponent/>
						</Route>
						
						<Route 
							path="/posts/:postid"
							render={ ({match}) => <FullPostComponent match={match} checkLogin={this.checkLogin} state={this.state} /> }
						/>
					</Switch>
					
				</Router>
			</div>
		);
	}
	
};

export default App;
