import React, { useRef, useState, useEffect } from "react";
import soc from "../../socket";
import { useParams } from "react-router-dom";

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [shapeType, setShapeType] = useState("free"); // 'free', 'rectangle', 'circle'
  const [shapeStart, setShapeStart] = useState({ x: 0, y: 0 });
  const { socketId } = useParams();
  const room = socketId;
  const socket = soc;

  useEffect(() => {
    socket.emit("joinRoom", room);      
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const startDrawing = (e) => {
      setIsDrawing(true);
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;      
      if (shapeType === "free") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        socket.emit("draw", { type: "start", x, y, shapeType, room: room });
      } else {
        setShapeStart({ x, y });
      }
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;

      if (shapeType === "free") {
        ctx.lineTo(x, y);
        ctx.stroke();
        socket.emit("draw", { type: "draw", x, y, shapeType, room: room });
      }
    };

    const stopDrawing = (e) => {
      if (isDrawing) {
        setIsDrawing(false);

        if (shapeType === "free") {
          ctx.closePath();
          socket.emit("draw", { type: "stop", shapeType, room: room });
        } else {
          // Draw rectangles or circles
          const x = shapeStart.x;
          const y = shapeStart.y;
          const currentX = e.clientX - canvas.offsetLeft;
          const currentY = e.clientY - canvas.offsetTop;
          const width = currentX - x;
          const height = currentY - y;

          if (shapeType === "rectangle") {
            ctx.strokeRect(x, y, width, height);
            socket.emit("draw", {
              type: "draw",
              x,
              y,
              width,
              height,
              shapeType,
              room: room,
            });
          } else if (shapeType === "circle") {
            const radius =
              Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
            ctx.beginPath();
            ctx.arc(x + width / 2, y + height / 2, radius, 0, 2 * Math.PI);

            ctx.stroke();
            socket.emit("draw", {
              type: "draw",
              x,
              y,
              width,
              height,
              radius,
              shapeType,
              room: room,
            });
          }
        }
      }
    };
    socket.on("initialState", (existingState) => {
      existingState.forEach((data) => {
        handleDraw(data);
      });
    });

    socket.on("draw", (data) => {
      handleDraw(data);
    });

    const handleDraw = (data) => {
      console.log("Received draw event", data);
      const { x, y, shapeType } = data;
      if (shapeType === "free") {
        if (data.type === "start") {
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else if (data.type === "draw") {
          ctx.lineTo(x, y);
          ctx.stroke();
        } else if (data.type === "stop") {
          ctx.closePath();
        }
      } else if (shapeType === "rectangle") {
        ctx.strokeRect(x, y, data.width, data.height);
      } else if (shapeType === "circle") {
        ctx.beginPath();
        ctx.arc(
          x + data.width / 2,
          y + data.height / 2,
          data.radius,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      }
    };
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [isDrawing, shapeType, shapeStart, socket]);

  const changeShapeType = (type) => {
    setShapeType(type);
  };

  const [downloadLink, setDownloadLink] = useState("");
  const downloadImage = () => {
    const canvas = canvasRef.current;
    const imageURI = canvas.toDataURL("image/jpg");
    setDownloadLink(imageURI);
  };
  const handleShare = () => {
    navigator.clipboard
      .writeText(socketId)
      .then(() => {
        alert("Socket ID copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <div className="flex flex-col items-start gap-4 ">
        <button
          onClick={() => changeShapeType("free")}
          className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        >
          Free Draw
        </button>

        <button
          onClick={() => changeShapeType("rectangle")}
          className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        >
          Rectangle
        </button>

        <button
          onClick={() => changeShapeType("circle")}
          className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        >
          Circle
        </button>

        <a
          href={downloadLink}
          onClick={downloadImage}
          download="myImage.jpg"
          className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        >
          Download
        </a>

        <button
          onClick={handleShare}
          className="flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        >
          Share
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        style={{ border: "1px solid #000" }}
      ></canvas>
    </div>
  );
};

export default Whiteboard;
