import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameBoard from './GameBoard';



function Simulation() {

    const [rounds, setRounds] = useState(0);
    const [robots, setRobots] = useState([]);
    const [checked, setChecked] = useState(new Array(robots.length).fill(false));
    const [dataRounds, setDataRounds] = useState({});

    const handleRounds = (event) => {
        setRounds(event.target.value);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/robots`)
            .then(response => response.json())
            .then(json => console.log(json))

        // setRobots((robot) => [...robots, robot]);
    }, []);

    const handleChecked = (position) => {
        const updateChaked = checked.map((element, index) =>
            index === position ? !element : element
        );

        setChecked(updateChaked);

        console.log('esta es mi variable de estado checked: ' + checked);
    }

    function Robots(props) {
        robots.map(index => {
            return (
                <input
                    type='checkbox'
                    key={props.id}
                    checked={checked[index]}
                    onChange={handleChecked}
                >
                    {props.name}
                </input>
            );
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();


        axios.post(`${process.env.REACT_APP_BACKEND_URL}/simulation`, {
            robots: robots,
            rounds: rounds,
        }).then(response => {
            setDataRounds(response.data);
        })

    }
    
    return (
        <>
            <h2>Simulation</h2>
            <div className='conteiner'>
                <form>
                    <label>Number of rounds</label>
                    <input type='number' onChange={handleRounds} />
                    <br />
                    <br />
                    <label>Select up to four robots</label>
                    <br />
                    {robots.map((robot) => (
                        <Robots key={robot.id} name={robot.name} />
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