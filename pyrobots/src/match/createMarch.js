import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CreateMatch() {
  const navigate = useNavigate();

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
    if (match.email === '' || match.password === '') {
      setErrors("empty field");
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_match`, {
        name: match.name,
        min_players: match.min_players,
        max_players: match.max_players,
        number_rounds: match.number_rounds,
        number_games: match.number_games,
        id_robot: match.id_robot,
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
        <input type='text' name="name" onChange={handleInputChange} />
        <p>Number of players to begin match</p>
        <label>Min: </label>
        <input type='number' name="min_players" placeholder="2" onChange={handleInputChange} />
        <label>Max: </label>
        <input type='number' name="max_players" placeholder="4" onChange={handleInputChange} />
        <label>Number of Rounds: </label>
        <input type='number' name="number_rounds" placeholder="50" onChange={handleInputChange} />
        <label>Number of Games: </label>
        <input type='number' name="number_games" placeholder="10" onChange={handleInputChange} />
        <select name="id_robot" onChange={handleInputChange}>
          <option value="1">robot</option>
        </select>
        <button type='submit'>Create Match</button>
        {error && <div>{error}</div>}
      </form>
    </>
  )
}

export default CreateMatch;