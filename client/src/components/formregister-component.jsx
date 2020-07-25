import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import LoadingComponent from "./loading-component";
import ErrorComponent from "./error-component";

function FormRegisterComponent(props) {
	return (<div className="container">
				{props.state.message ? <ErrorComponent errormsg={props.state.message}/> : <span></span>}
	
				<div className="card card-body mt-4">
					<h1>Registrar</h1>
					
					{props.state.attemptingRegister 
						?
						<LoadingComponent/>
						
						:
						<form method="post" onSubmit={(event) => {event.preventDefault(); props.onFormSubmit(event)}}>
							<input required type="text" name="username" className="form-control mt-2" placeholder="Nome de usuário"/>
							<input required type="password" name="senha" className="form-control mt-2" placeholder="Senha"/>
							<button type="submit" className="btn btn-primary mt-4">Registrar</button>
						</form>
					}
				</div>
			</div>);
}

export default FormRegisterComponent;