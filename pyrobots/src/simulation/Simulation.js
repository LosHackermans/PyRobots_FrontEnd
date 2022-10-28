import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Simulation() {

    const [rounds, setRounds] = useState(0);
    const [robots, setRobots] = useState([]);
    const [checked, setChecked] = useState(new Array(robots.length).fill(false));

    const handleRounds = (event) => {
        setRounds(event.target.value);
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/robots`)
            .then(response => response.json())
            .then(json => console.log(json))

        // setRobots((robot) => [...robots, robot]);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(robots !== []){
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/simulation`, {
                robots: robots,
                rounds: rounds,
            }).then(response => {
                console.log(response) //!Ver después que hacer con el response
            })
        }else{

        }
    }

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

    return (
        <>
            <h2>Simulation</h2>
            <form>
                <label>Cantidad de rondas</label>
                <input type='number' onChange={handleRounds} />
                <br />
                <br />
                <label>Seleccione el o los robots que desea usar en la simulación</label>
                <br />
                {robots.map((robot) => (
                    <Robots key={robot.id} name={robot.name} />
                ))}
                <br />
                <button onClick={handleSubmit}>Iniciar simulación</button>
            </form>
        </>
    )
}

export default Simulation;