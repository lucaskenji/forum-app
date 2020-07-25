import React, {Component} from "react";
import axios from "axios";

import LoadingComponent from "./loading-component";
import ErrorComponent from "./error-component";

class CommentsComponent extends Component {
	state = {
		status: "carregando",
		comments: []
	}
	
	componentDidMount() {
		axios.get("http://localhost:8081/api/comments/from/" + this.props.postid)
		.then((response) => {
			this.setState({status: "pronto", comments: response.data});
		})
		.catch((err) => {
			this.setState({status: "erro"});
		})
	}
	
	formatarData(data) {
		const dataNaoFormatada = new Date(data);
		let dia = "" + dataNaoFormatada.getDate();
		let mes = "" + (dataNaoFormatada.getMonth() + 1);
		const ano = dataNaoFormatada.getFullYear();

		if (mes.length < 2) {
			mes = "0" + mes;
		}
		if (dia.length < 2) {
			dia = "0" + dia;
		}

		return [dia, mes, ano].join('/');
	}
	
	render() {
		if (this.state.status === "carregando") {
			return (
				<div>
					<LoadingComponent/>
				</div>
			);
		} else if (this.state.status === "erro") {
			return (
				<ErrorComponent errormsg="Ocorreu um erro durante o carregamento de comentários."/>
			)
		} else {
			return (
				<div>
				{
					this.state.comments.map((elem) => 
					<div key={elem._id} className="card card-body mt-4">
						{elem.texto}
						<small>por {elem.autor.username}, em {this.formatarData(elem.data)}</small>
					</div>)
				}
				</div>
			);
		}
	}
}

export default CommentsComponent;