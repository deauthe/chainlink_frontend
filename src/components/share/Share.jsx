import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import FileSelectButton from "@/components/FileSelectButton/FileSelectButton";
import { useState } from "react";

export default function Share() {
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileSelect = async (file) => {
		setSelectedFile(file);
		// Do something with the selected file in the parent component
		console.log("photo picked up:");
		console.log(selectedFile);
	};

	const handleMint = () => {
		console.log(`minting....${selectedFile ? selectedFile.name : "something"}`);
	};
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
					<input placeholder="new funny shit?" className="shareInput" />
				</div>
				<hr className="shareHr" />
				<div className="shareBottom">
					<div className="shareOptions">
						<div className="shareOption">
							<PermMedia htmlColor="tomato" className="shareIcon" />
							<FileSelectButton
								onFileSelect={handleFileSelect}
								className="fileChooseButton"
							>
								<span className="shareOptionText">Photo or Video</span>
							</FileSelectButton>
						</div>
					</div>
					<button onClick={handleMint} className="shareButton">
						Mint
					</button>
				</div>
			</div>
		</div>
	);
}
