import React, { useState, useRef, useEffect } from "react";
import FileSelectButton from "@/components/FileSelectButton/FileSelectButton";
import "./share.css";

export default function Share() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
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
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(...event.target.value);
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

  const handleMint = () => {
    const canvas = canvasRef.current;

    const dataURL = canvas.toDataURL();

    fetch(dataURL)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "meme.png", { type: "image/png" });
         

        console.log("Minting with the created meme file:", file);
      })
      .catch((error) => {
        console.error("Error converting data URL to Blob:", error);
      });
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
