import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import GameBoard from './GameBoard';



function Simulation() {

    const [rounds, setRounds] = useState(0);
    const [listRobots, setListRobots] = useState([])
    const [robots, setRobots] = useState([]);
    const [dataRounds, setDataRounds] = useState({});
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

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
        setMessage('');
        setError('')

        if (robots.length === 0) {
            setMessage('you must select at least one robot')
        }

        if (rounds === 0 || rounds > 200) {
            setMessage('please enter a number between 1 and 200')
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/simulation`, {
            robots: robots,
            rounds: rounds,
        }).then(response => {
            setDataRounds(response.data);
        }).catch(error => {
            if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else {
                setError('Server error');
            }

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
                    <label data-testid="rounds">Number of rounds: </label>
                    <br />
                    <input type='number' onChange={handleRounds} />
                    <br />
                    <br />
                    <label data-testid="robots">Select up to four robots:</label>
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
                    {message ? <p>{message}</p> : null}
                    <p>{error}</p>
                </form>
                <GameBoard data={dataRounds} />
            </div>
        </>
    )
}

export default Simulation;