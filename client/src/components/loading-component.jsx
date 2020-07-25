import React from "react";

function LoadingComponent(props) {
	return (
		<div style={{marginLeft: "50%"}} className="spinner-border" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	);
}

export default LoadingComponent;