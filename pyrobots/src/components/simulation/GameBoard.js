import React, { useRef, useEffect, useState } from "react";
import '../../css/Simulation.css';

const colors = ["red", "green", "blue", "yellow"];

const drawRobots = (context, coorX, coorY, color) => {
    context.beginPath()
    context.arc(coorX, coorY, 10, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

let roundNumber = 0;
let intervalId;
const drawRound = (context, rounds) => {
    context.clearRect(0, 0, 1000, 1000);
    for (let j = 0; j < rounds[roundNumber].robots.length; j++) {
        drawRobots(context, rounds[roundNumber].robots[j].x, rounds[roundNumber].robots[j].y, colors[j % rounds[roundNumber].robots.length]);
    }
    roundNumber++;
    if (roundNumber === rounds.length) {
        console.log('entre');
        clearInterval(intervalId);
    }
}

function GameBoard(props) {
    const [canvasContext, setCanvasContext] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 1000;
        canvas.height = 1000;
        const context = canvas.getContext("2d");
        setCanvasContext(context);

        if (props.data.rounds !== undefined) {
            roundNumber = 0;
            intervalId = setInterval(drawRound, 100, context, props.data.rounds);
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