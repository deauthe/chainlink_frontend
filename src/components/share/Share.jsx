import React, { useState, useRef, useEffect, useCallback } from "react";
import { PermMedia, EmojiEmotions } from "@material-ui/icons";
import FileSelectButton from "@/components/FileSelectButton/FileSelectButton";
import "./share.css";

export default function Share() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const canvasRef = useRef(null);
  const [text, setText] = useState("");
  const [overlayPosition, setOverlayPosition] = useState({ x: 80, y: 50 });
  const [overlayScale, setOverlayScale] = useState(0.1); // Initialize with a small scale
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const emojiImg = new Image();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (selectedFile) {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        if (selectedEmoji) {
          emojiImg.onload = () => {
            const { x, y } = overlayPosition;
            const width = emojiImg.width * overlayScale;
            const height = emojiImg.height * overlayScale;

            context.save();
            context.translate(x + width / 2, y + height / 2);
            context.rotate((rotationAngle * Math.PI) / 180);
            context.drawImage(emojiImg, -width / 2, -height / 2, width, height);
            context.restore();
          };
          emojiImg.src = selectedEmoji;
        }
      };
      img.src = URL.createObjectURL(selectedFile);
    }
  }, [
    selectedFile,
    selectedEmoji,
    overlayPosition,
    overlayScale,
    rotationAngle,
  ]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setSelectedEmoji(null);
  };

  const handleAddEmoji = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleAddText = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.font = "20px Arial";
    context.fillStyle = "black";
    context.textBaseline = "top";

    const { x, y } = overlayPosition;
    const width = canvas.width;
    const height = canvas.height;

    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate((rotationAngle * Math.PI) / 180);
    context.fillText(text, -width / 2, -height / 2);
    context.restore();
  };

  const handleMint = () => {
    console.log(`minting....${selectedFile ? selectedFile.name : "something"}`);
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (
      offsetX >= overlayPosition.x &&
      offsetX <= overlayPosition.x + emojiImg.width * overlayScale &&
      offsetY >= overlayPosition.y &&
      offsetY <= overlayPosition.y + emojiImg.height * overlayScale
    ) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      setOverlayPosition({
        x: overlayPosition.x + dx,
        y: overlayPosition.y + dy,
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScale = (scaleFactor) => {
    const newScale = overlayScale + scaleFactor;
    if (newScale > 0.1) {
      setOverlayScale(newScale);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <canvas
            ref={canvasRef}
            className="shareCanvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
          <input
            placeholder="new funny shit?"
            className="shareInput"
            value={text}
            onChange={handleTextChange}
          />
          <button onClick={handleAddText}>Add Text</button>
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
                  />
                )
              )}
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
