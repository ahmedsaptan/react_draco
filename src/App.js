import React, { Component } from "react";
import "./App.css";
import * as THREE from "three";
import axios from "axios";

const draco3d = require("draco3d");
const decoderModule = draco3d.createDecoderModule({});
const encoderModule = draco3d.createEncoderModule({});

class App extends Component {
	state = {
		selectedFile: null
	};
	fileSelectedHandler = event => {
		console.log(event.target.files[0]);
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	fileCompressHandler = () => {
		
	}
	fileUploadHandler = () => {
		const fd = new FormData();
		fd.append(
			"ObjectModel",
			this.state.selectedFile,
			this.state.selectedFile.name
		);
		axios
			.post("API", fd, {
				onUploadProgress: ProgressEvent => {
					console.log(
						"Upload Prograss: ",
						Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + "%"
					);
				}
			})
			.then(res => {
				console.log(res);
			});
	};
	render() {
		return (
			<div>
				<input type="file" onChange={this.fileSelectedHandler} />
				<button onClick={this.fileUploadHandler}>Upload</button>
				<div ref={ref => (this.mount = ref)} />
			</div>
		);
	}
}

export default App;
