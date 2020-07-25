import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

function NavbarComponent(props) {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<span className="navbar-brand">Forum</span>
			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/">Home</Link>
				</li>
				
				{	!props.state.loginData
					?
						<li className="nav-item">
							<Link className="nav-link" to="/login">Login</Link>
						</li>
					:
						<li className="nav-item">
							<Link className="nav-link" to="/logout">Logout</Link>
						</li>
				}
				
				{	!props.state.loginData
					?
						<li className="nav-item">
							<Link className="nav-link" to="/register">Registrar</Link>
						</li>
					:
						<span/>
				}
	
			</ul>
		</nav>
	);
}

export default NavbarComponent;