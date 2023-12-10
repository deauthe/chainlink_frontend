// FileSelectorButton.js
import "./FileSelectButton.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useRef } from "react";

const FileSelectorButton = ({ onFileSelect }) => {
	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		onFileSelect(selectedFile);
		console.log("photo picked");
		console.log(selectedFile);
	};

	return (
		<div>
			<button
				className="selectFileButton"
				onClick={() => fileInputRef.current.click()}
			>
				<BsThreeDotsVertical htmlColor="white" className="shareIcon" />
				Select File
			</button>

			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
		</div>
	);
};

export default FileSelectorButton;
