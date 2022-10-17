import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CreateMatch() {
  const navigate = useNavigate();

  const [robots, setRobots] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/robots`)
      .then(function (response) {
        setRobots(response.data)
      })
      .catch(function (error) {
        setRobots([]);
      });
  }, []);

  const [match, setMatch] = useState({
    name: '',
    min_players: 2,
    max_players: 4,
    number_rounds: 50,
    number_games: 10,
    id_robot: ''
  })

  const [error, setErrors] = useState('')

  const handleInputChange = (event) => {
    setMatch({
      ...match,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (match.name === '' || match.id_robot === '') {
      setErrors("empty field");
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_match`, {
        name: match.name,
        min_players: parseInt(match.min_players),
        max_players: parseInt(match.max_players),
        number_rounds: parseInt(match.number_rounds),
        number_games: parseInt(match.number_games),
        id_robot: parseInt(match.id_robot),
      })
        .then(function (response) {
          if (response.data.id_match) {
            // make somthing with id_match
            console.log(response.data.id_match);
            navigate("/list_matches");
          }
          else if (response.data.error) {
            setErrors(response.data.error);
          }
        })
        .catch(function (error) {
          setErrors(error.message);
        });
    }

  }
  return (
    <>
      <h2>Create Match</h2>
      <form onSubmit={onSubmit}>
        <label>Name: </label>
        <input data-testid="name-input" type='text' name="name" onChange={handleInputChange} />
        <p>Number of players to begin match</p>
        <label>Min: </label>
        <input data-testid="min_players-input" type='number' name="min_players" placeholder="2" onChange={handleInputChange} />
        <label>Max: </label>
        <input data-testid="max_players-input" type='number' name="max_players" placeholder="4" onChange={handleInputChange} />
        <label>Number of Rounds: </label>
        <input data-testid="number_rounds-input" type='number' name="number_rounds" placeholder="50" onChange={handleInputChange} />
        <label>Number of Games: </label>
        <input data-testid="number_games-input" type='number' name="number_games" placeholder="10" onChange={handleInputChange} />
        <select data-testid="robot-select" key="robots" name="id_robot" onChange={handleInputChange}>
          <option value="">-select your robot-</option>
          {
            robots.map((element, index) => <option key={element.id} value={element.id}>{element.name}</option>)
          }
        </select>
        <button type='submit'>Create Match</button>
        {error && <div>{error}</div>}
      </form>
    </>
  )
}

export default CreateMatch;