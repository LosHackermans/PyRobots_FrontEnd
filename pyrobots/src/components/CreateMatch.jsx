import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormType } from "./FormType";
import "../css/CreateMatch.css";

export const CreateMatch = () => {
  const navigate = useNavigate();

  const [robots, setRobots] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/robots`)
      .then(function (response) {
        setRobots(response.data);
      })
      .catch(function (error) {
        setRobots([]);
      });
  }, []);

  const [match, setMatch] = useState({
    name: "",
    min_players: 2,
    max_players: 4,
    number_rounds: 50,
    number_games: 10,
    id_robot: "",
  });

  const [error, setErrors] = useState("");

  const handleInputChange = (event) => {
    setMatch({
      ...match,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (match.name === "" || match.id_robot === "") {
      setErrors("empty field");
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/create_match`, {
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
          } else if (response.data.error) {
            setErrors(response.data.error);
          }
        })
        .catch(function (error) {
          setErrors(error.message);
        });
    }
  };
  return (
    <div className="animate__animated animate__zoomInDown">
      <h2>Create a Match</h2>
      <div className="create-match-container">
        <form className="col-lg-4 offset-lg-1" onSubmit={onSubmit}>
          <FormType
            id="name-input"
            ph="Name of the match"
            type="text"
            text="Name:"
            handleInputChange={handleInputChange}
          />
          <FormType
            id="min_players-input"
            ph="2"
            type="number"
            text="Min:"
            handleInputChange={handleInputChange}
          />
          <FormType
            id="max_players-input"
            ph="4"
            type="number"
            text="Max:"
            handleInputChange={handleInputChange}
          />
          <FormType
            id="number_rounds-input"
            ph="50"
            type="number"
            text="Number of Rounds:"
            handleInputChange={handleInputChange}
          />
          <FormType
            id="number_games-input"
            ph="10"
            type="number"
            text="Number of Games:"
            handleInputChange={handleInputChange}
          />
          <div className="btn-container">
            <select
              data-testid="robot-select"
              key="robots"
              name="id_robot"
              className="btn btn-dark"
              onChange={handleInputChange}
            >
              <option value="">-select your robot-</option>
              {robots.map((element, index) => (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-dark">
              Create Match
            </button>
          </div>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};
