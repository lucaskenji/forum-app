import React from "react";

function ErrorComponent(props) {
	let errormsg = "";
	
	if (props.errormsg) {
		errormsg = props.errormsg;
	} else if (props.errorid) {
		
		switch (props.errorid) {
			case "100":
				errormsg = "Ocorreu um erro durante a autenticação. Tente novamente mais tarde";
				break;
			case "104":
				errormsg = "O nome de usuário ou senha especificado(a) está incorreto.";
				break;
		}
		
	}

	return(
		<div className="alert alert-danger">
			{errormsg}
		</div>
	);
}

export default ErrorComponent;