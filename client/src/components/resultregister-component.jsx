import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function ResultRegisterComponent(props) {
	return (<div className="container" style={{textAlign: "center"}}>
				<div className="card card-body mt-4">
					<h1>Registrado com sucesso</h1>
					<span>Faça <a href="/login/">login</a> para continuar</span>
				</div>
			</div>);
}

export default ResultRegisterComponent;