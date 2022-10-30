import { useState, useEffect } from 'react'
import axios from 'axios';


function ListMatches() {

  const [createdMaches, setCreatedMatches] = useState([]);
  const [joinedMatches, setJoinedMatches] = useState([]);
  const [joinableMatches, setJoinableMatches] = useState([]);
  const [error, setError] = useState('');
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState("");

  const getMatches = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/matches`)
    .then(function (response) {
      setCreatedMatches(response.data.User_Games);
      setJoinedMatches(response.data.Games_already_join)
      setJoinableMatches(response.data.Games_To_Join);
    })
    .catch(function (error) {
      setCreatedMatches([]);
      setJoinedMatches([])
      setJoinableMatches([]);
    });
  }

  const getRobots = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/robots`)
      .then(function (response) {
        setRobots(response.data.robots);
      })
      .catch(function (error) {
        setRobots([]);
      });
  }

  useEffect(() => {
    getMatches();
    getRobots();
  }, []);

  const handleJoin = (id) => {
    setError("");
    if (selectedRobot === "") {
      setError("A robot must be selected");
      return;
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/join_match`, {
      matchId: id,
      robotID: selectedRobot
    })
      .then(function (response) {
        if (response.data.detail) {
          alert(response.data.detail);
        }
        else if (response.data.error) {
          setError(response.data.error);
        }
      })
      .catch(function (error) {
        setError(error.message);
      });
  }
  
  return (
    <>
      <h2>Matches</h2>
      <div>
        <h3>Created matches:</h3>
        <ul>
          {createdMaches.map((element) =>
          <li key={element.id} >
            {element.name}
            {/* <button> Details </button> */}
          </li>)}
        </ul>
      </div>
      <div>
        <h3>Joined matches:</h3>
        <ul>
          {joinedMatches.map((element) =>
          <li key={element.id} >
            {element.name}
            {/* <button> Details </button> */} 
          </li>)}
        </ul>
      </div>
      <div>
        <h3>Matches to join:</h3>
      <div>
          <label> Select a robot to join a match: </label>
          <select data-testid="robot-select" key="robots" name="id_robot" onChange={(event) => setSelectedRobot(event.target.value)} required>
            <option value="">-select your robot-</option>
            {
              robots.map((element, index) => <option key={element.id} value={element.id}>{element.name}</option>)
            }
          </select>
        </div>
        <ul>
          {joinableMatches.map((element) =>
          <li key={element.id} >
            {element.name}
            <button onClick={() => handleJoin(element.id)}> Join </button>
          </li>)}
        </ul>
        {error && <div>{error}</div>}
      </div>
    </>
  )
}

export default ListMatches;