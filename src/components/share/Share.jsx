import React, { useState, useRef, useEffect } from "react";
import FileSelectButton from "@/components/FileSelectButton/FileSelectButton";
import "./share.css";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import abi from '../../app/home/utils/memeplace.json'
// IPFS

import { ethers } from "ethers";
import { Buffer } from "buffer";
import { create as ipfsHttpClient } from "ipfs-http-client";
const projectId = "2ONjCGu7UlrPOzmZ3hqy8WlN2GC";
const projectSecretKey = "43cc6a424bd74fd70d8a175972fbba87";

const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;
const subdomain = "https://uniqo-marketplace.infura-ipfs.io";
const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export default function Share() {
  const [imagei, setImage] = useState("");
  const [url , setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [name ,setName] = useState('');
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 80, y: 50 });
  const [textScale, setTextScale] = useState(1);
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [dragStartText, setDragStartText] = useState({ x: 0, y: 0 });

  const [emojiPosition, setEmojiPosition] = useState({ x: 80, y: 50 });
  const [emojiScale, setEmojiScale] = useState(0.1);
  const [isDraggingEmoji, setIsDraggingEmoji] = useState(false);
  const [dragStartEmoji, setDragStartEmoji] = useState({ x: 0, y: 0 });
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState("");
  const [listingPrice, setListingPrice] = useState("");

  //   contract fetching starts here------------------------------

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const Address = "0x4dA194bC069bDf5a5ee580632dAF0b986b45287f";

  async function getContract() {
    if (!isConnected) {
      alert("Please connect Metamask");
      return;
    }
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = await ethersProvider.getSigner();
    // The Contract object
    const contract = new ethers.Contract(Address, abi, signer);
    return contract;
  }
  // ends here ----------------------------------------------------------

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(...event.target.value);
  };
  const handleNameChange = (event) => {
    setName(...event.target.value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (selectedFile) {
      const img = new Image();
      img.onload = () => {
        canvas.width = 500;
        canvas.height = 500;
        context.drawImage(img, 0, 0, 500, 500);

        if (selectedEmoji) {
          const emojiImg = new Image();
          emojiImg.onload = () => {
            const { x, y } = emojiPosition;
            const width = emojiImg.width * emojiScale;
            const height = emojiImg.height * emojiScale;

            context.save();
            context.translate(x + width / 2, y + height / 2);
            context.drawImage(emojiImg, -width / 2, -height / 2, width, height);
            context.restore();
          };
          emojiImg.src = selectedEmoji;
        }

        context.font = "20px Arial";
        context.fillStyle = "white";
        context.textBaseline = "top";
        const { x, y } = textPosition;
        const width = canvas.width;
        const height = canvas.height;

        context.save();
        context.translate(x + width / 2, y + height / 2);
        context.scale(textScale, textScale);
        context.fillText(text, -width / 2, -height / 2);
        context.restore();
      };
      img.src = URL.createObjectURL(selectedFile);
      console.log(img.src);
    }
  }, [
    selectedFile,
    selectedEmoji,
    text,
    textPosition,
    textScale,
    emojiPosition,
    emojiScale,
  ]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setSelectedEmoji(null);
  };

  const handleAddEmoji = (emoji) => {
    setSelectedEmoji(emoji);
    // Reset emoji position and scale
    setEmojiPosition({ x: 80, y: 50 });
    setEmojiScale(0.1);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddText = () => {
    // Reset text position and scale
    setTextPosition({ x: 80, y: 50 });
    setTextScale(1);
  };

  const UploadtoIpfs = async () => {
    const canvas = canvasRef.current;

    const dataURL = canvas.toDataURL();

    try {
      const blob = await fetch(dataURL).then((res) => res.blob());
      const file = new File([blob], "meme.png", { type: "image/png" });

      if (typeof file !== "undefined") {
        try {
          const result = await client.add(file);
          console.log("this is result", result);
          setImage(`${subdomain}/ipfs/${result.path}`);
        console.log(imagei);
        } catch (error) {
          console.log("ipfs image upload error: ", error);
        }
      }

      console.log("Minting with the created meme file:", file);
    } catch (error) {
      console.error("Error converting data URL to Blob:", error);
    }
  };

  const handleMint = async () => {
     var contract ;
	try {
		contract = await getContract();

	} catch (error) {
		alert("error in fetching contract")
	}
   
    if (!contract) {
      alert("Error,Try again by conneting metamask");
      return;
    }
    const imageURL = UploadtoIpfs();
	const Price = ethers.utils.parseUnits(price, 'ether');

	const data = JSON.stringify({name, description, image: imagei});
     

	try {
		const result = await client.add(data);
        setUrl(`${subdomain}/ipfs/${result.path}`);
	} catch (error) {
		alert("Error, in file uplaod on ipfs")
		return;
	}

	if(!url || !Price){
		alert("Fill all the inputs");
		return;
	}
    

	try {
		const listing = await contract.getListingPrice();
		console.log(listing);
		setListingPrice(listing);
	} catch (error) {
		alert("error in fetching the price ")
	}

	if(!listingPrice){
		alert("listing price error")
		return;
	}

	console.log(url, Price,listingPrice.toString())

	try {
		const transaction = await contract.createToken(url, Price, { value: listingPrice.toString() })
        await transaction.wait();
	} catch (error) {
		alert("Error in creating Token  , try Again");
	}

  };





  const handleMouseDownText = (e) => {
    setIsDraggingText(true);
    setDragStartText({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMoveText = (e) => {
    if (isDraggingText) {
      const dx = e.clientX - dragStartText.x;
      const dy = e.clientY - dragStartText.y;

      setTextPosition({
        x: textPosition.x + dx,
        y: textPosition.y + dy,
      });

      setDragStartText({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUpText = () => {
    setIsDraggingText(false);
  };

  const handleScaleText = (scaleFactor) => {
    const newTextScale = textScale + scaleFactor;
    if (newTextScale > 0.1) {
      setTextScale(newTextScale);
    }
  };

  const handleMouseDownEmoji = (e) => {
    setIsDraggingEmoji(true);
    setDragStartEmoji({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMoveEmoji = (e) => {
    if (isDraggingEmoji) {
      const dx = e.clientX - dragStartEmoji.x;
      const dy = e.clientY - dragStartEmoji.y;

      setEmojiPosition({
        x: emojiPosition.x + dx,
        y: emojiPosition.y + dy,
      });

      setDragStartEmoji({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUpEmoji = () => {
    setIsDraggingEmoji(false);
  };

  const handleScaleEmoji = (scaleFactor) => {
    const newEmojiScale = emojiScale + scaleFactor;
    if (newEmojiScale > 0.1) {
      setEmojiScale(newEmojiScale);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <canvas
            ref={canvasRef}
            className="shareCanvas"
            onMouseDown={handleMouseDownText}
            onMouseMove={handleMouseMoveText}
            onMouseUp={handleMouseUpText}
          />
          <input
            placeholder="new funny shit?"
            className="shareInput"
            value={text}
            onChange={handleTextChange}
          />
          <button className="addTextButton" onClick={handleAddText}>
            Add Text
          </button>
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <FileSelectButton
                onFileSelect={handleFileSelect}
                className="fileChooseButton"
              >
                <span className="shareOptionText">Photo or Video</span>
              </FileSelectButton>
            </div>
            <div className="nftDescription">
              <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                className="descriptionInput"
                placeholder="description"
              />
              <input
                type="text"
                value={price}
                onChange={handlePriceChange}
                className="priceInput"
                placeholder="price"
              />

              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="priceInput"
                placeholder="name"
              />
            </div>

            <div className="emojiOptions">
              {["assets/emo1.png", "assets/emo2.png", "assets/emo3.png"].map(
                (emoji, index) => (
                  <img
                    key={index}
                    src={emoji}
                    alt={`emoji ${index}`}
                    className={`emoji ${
                      selectedEmoji === emoji ? "selected" : ""
                    }`}
                    style={{ width: "30px", height: "30px" }}
                    onClick={() => handleAddEmoji(emoji)}
                    onMouseDown={handleMouseDownEmoji}
                    onMouseMove={handleMouseMoveEmoji}
                    onMouseUp={handleMouseUpEmoji}
                    onWheel={(e) => handleScaleEmoji(e.deltaY > 0 ? 0.1 : -0.1)}
                  />
                )
              )}
            </div>
            <div className="buttonWrapper">
              <button onClick={handleMint} className="shareButton">
                Mint
              </button>
              <div className="editWrapper">
                <button
                  className="editButtons"
                  onClick={handleAddEmoji}
                  style={{ marginLeft: "10px" }}
                >
                  Add Emoji
                </button>
                <button
                  className="editButtons"
                  onClick={() => handleScaleText(0.1)}
                >
                  Scale Text Up
                </button>
                <button
                  className="editButtons"
                  onClick={() => handleScaleText(-0.1)}
                >
                  Scale Text Down
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
