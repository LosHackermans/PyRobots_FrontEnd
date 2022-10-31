import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CreateMatch() {
  const navigate = useNavigate();

  const [robots, setRobots] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/robots`)
      .then(function (response) {
        setRobots(response.data.robots);
      })
      .catch(function (error) {
        setRobots([]);
      });
  }, []);

  const [match, setMatch] = useState({
    name: '',
    min_players: 2,
    max_players: 4,
    number_of_rounds: 50,
    number_of_games: 10,
    id_robot: '',
    password: '',
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
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_match`, match)
      .then(function (response) {
        if (response.data.match_id) {
          // make somthing with id_match
          console.log(response.data.match_id);
          navigate("/matches"); //Todo: navigate to match's lobby
        }
        else if (response.data.error) {
          setErrors(response.data.error);
        }
      })
      .catch(function (error) {
        setErrors(error.message);
      });
  }
  return (
    <>
      <h2>Create Match</h2>
      <form onSubmit={onSubmit}>
        <label>Name: </label>
        <input data-testid="name-input" type='text' name="name" onChange={handleInputChange} required />
        <br />
        <p>Number of players to begin match</p>
        <label>Min: </label>
        <input data-testid="min_players-input" type='number' name="min_players" placeholder={match.min_players} onChange={handleInputChange} />
        <label>Max: </label>
        <input data-testid="max_players-input" type='number' name="max_players" placeholder={match.max_players} onChange={handleInputChange} />
        <br />
        <br />
        <label>Number of Rounds: </label>
        <input data-testid="number_rounds-input" type='number' name="number_rounds" placeholder={match.number_of_rounds} onChange={handleInputChange} />
        <br />
        <br />
        <label>Number of Games: </label>
        <input data-testid="number_games-input" type='number' name="number_games" placeholder={match.number_of_games} onChange={handleInputChange} />
        <br />
        <br />
        <select data-testid="robot-select" key="robots" name="id_robot" onChange={handleInputChange} required>
          <option value="">-select your robot-</option>
          {
            robots.map((element, index) => <option key={element.id} value={element.id}>{element.name}</option>)
          }
        </select>
        <br />
        <br />
        <button type='submit'>Create Match</button>
        {error && <div>{error}</div>}
      </form>
    </>
  )
}

export default CreateMatch;