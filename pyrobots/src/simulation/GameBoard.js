import React, { useRef, useEffect, useState } from "react";
import './Simulation.css';

const colors = ["red", "green", "blue", "yellow"];

const drawRobots = (context, coorX, coorY, color) => {
    context.beginPath()
    context.arc(coorX, coorY, 5, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

const draw = (context, canvas, x, y, color) => {
    context.clearRect(x, y, canvas.width, canvas.height);
    drawRobots(context, x, y, color);
    // requestAnimationFrame(draw)
}

function GameBoard(props) {
    const [canvasContext, setCanvasContext] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        setCanvasContext(context);

        if (props.data.rounds !== undefined) {
            for (let i = 0; i < props.data.rounds.length; i++) {
                draw(canvasContext, canvas, props.data.rounds[i].x, props.data.rounds[i].y, colors[i])
            }
        }

    }, [canvasRef, canvasContext, props.data.rounds]);

    return (
        <canvas id="gameBoard" ref={canvasRef} />
    );
}

export default GameBoard;

GameBoard.defaultProps = {
    data: {},
};