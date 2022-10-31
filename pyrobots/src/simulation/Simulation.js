import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import GameBoard from './GameBoard';



function Simulation() {

    const [rounds, setRounds] = useState(0);
    const [listRobots, setListRobots] = useState([])
    const [robots, setRobots] = useState([]);
    const [dataRounds, setDataRounds] = useState({});

    const handleRounds = (event) => {
        setRounds(event.target.value);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/robots`)
            .then(response => {
                setListRobots(response.data.robots);
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/simulation`, {
            robots: robots,
            rounds: rounds,
        }).then(response => {
            setDataRounds(response.data);
        })

    }

    const handleChecked = useCallback((event, id) => {
        if (event.target.checked) {
            setRobots(value => [...value, id])
        } else {
            setRobots(value => value.filter(it => it !== id))
        }
    }, [setRobots])
    
    return (
        <>
            <h2>Simulation</h2>
            <div className='conteiner'>
                <form>
                    <label>Number of rounds: </label>
                    <br />
                    <input type='number' onChange={handleRounds} />
                    <br />
                    <br />
                    <label>Select up to four robots:</label>
                    <br />
                    {listRobots.map((robot, index) => (
                        <div key={index}>
                            <input 
                            type='checkbox' 
                            key={robot.id} 
                            id={robot.id} 
                            value={robot.name} 
                            onChange={(event) => handleChecked(event, robot.id)}
                        />
                            <label key={robot.name}>{robot.name}</label>
                        </div>    
                    ))}
                    <br />
                    <button onClick={handleSubmit}>Start simulation</button>
                </form>
                <GameBoard data={dataRounds} />
            </div>
        </>
    )
}

export default Simulation;