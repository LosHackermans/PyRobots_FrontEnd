import React, { useRef, useEffect, useState } from "react";
import '../../css/Simulation.css';

const colors = ["red", "green", "blue", "yellow"];

const drawRobots = (context, robot) => {
    context.beginPath()
    context.arc(robot.x, robot.y, 10, 0, Math.PI * 2);
    context.fillStyle = robot.color;
    context.fill();
    context.closePath();
}

const drawMissiles = (context, missiles) => {
    context.beginPath()
    context.arc(missiles.x, missiles.y, 5, 0, Math.PI * 2);
    context.fillStyle = missiles.color;
    context.fill();
    context.closePath();
}

let roundNumber = 0;
let intervalId;
const drawRound = (context, rounds) => {
    context.clearRect(0, 0, 1000, 1000);
    for (let j = 0; j < rounds[roundNumber].robots.length; j++) {
        
        rounds[roundNumber].robots[j].life === 0 ? rounds[roundNumber].robots[j].color = "white" : rounds[roundNumber].robots[j].color = colors[j % rounds[roundNumber].robots.length]
        drawRobots(context, rounds[roundNumber].robots[j]);
    }

    for (let j = 0; j < rounds[roundNumber].missiles.length; j++) {    
        rounds[roundNumber].missiles[j].exploded = false
        rounds[roundNumber].missiles[j].exploded === true? rounds[roundNumber].missiles[j].color = "black" : rounds[roundNumber].missiles[j].color = colors[j % rounds[roundNumber].missiles.length]
        drawMissiles(context, rounds[roundNumber].missiles[j]);
    }

    roundNumber++;
    if (roundNumber === rounds.length) {
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