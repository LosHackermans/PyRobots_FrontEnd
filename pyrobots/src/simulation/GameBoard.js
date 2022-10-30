import React, { useRef, useEffect } from "react";
import './Simulation.css';

function GameBoard(props) {

    let gameBoardRef = useRef(null);
    let contextRef = useRef(null);
    
    useEffect(() => {
        const gameBoard = gameBoardRef.current;
        const context = gameBoard.getContext('2d');
        contextRef.current = context;

    }, []);


    return (
        <canvas id="GameBoard" ref={gameBoardRef}>
        </canvas>
    );
}

export default GameBoard;