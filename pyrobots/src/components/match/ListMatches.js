import { useState, useEffect } from 'react'
import axios from 'axios';
import '../../css/forms.css'
import '../../css/listMatches.css'

function ListMatches() {

  const [createdMaches, setCreatedMatches] = useState([]);
  const [joinedMatches, setJoinedMatches] = useState([]);
  const [joinableMatches, setJoinableMatches] = useState([]);
  const [error, setError] = useState('');
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState("");

  const getMatches = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/matches`)
      .then(function (response) {
        setCreatedMatches(response.data.User_Games);
        setJoinedMatches(response.data.Games_already_join)
        setJoinableMatches(response.data.Games_To_Join);
      })
      .catch(function (error) {
        setCreatedMatches([]);
        setJoinedMatches([])
        setJoinableMatches([]);
        setError(error.message);
      });
  }

  const getRobots = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/robots`)
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
      id_match: id,
      id_robot: selectedRobot,
      password_match: ""
    })
      .then(function (response) {
        if (response.data.message) {
          alert(response.data.message);
          getMatches();
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
      <h2 className="mx-3 my-2">Matches</h2>
      <button className="my-btn mx-3 my-2" onClick={() => getMatches()} > Refresh </button>
      <div className="policy-table mx-3">
        <div className="row">
          <ul className="col-6 mt-3 mb-3" data-testid="created_matches">
            <h3>Created matches:</h3>
            {createdMaches.map((element) =>
              <li className="policy" key={element.id} >
                {element.name}
              </li>)}
          </ul>
          <ul className="col-6 mt-3 mb-3" data-testid="joined_matches">
            <h3>Joined matches:</h3>
            {joinedMatches.map((element) =>
              <li className="policy" key={element.id} >
                {element.name}
              </li>)}
          </ul>
        </div>
        <div data-testid="joinable_matches" >
          <h3>Matches to join:</h3>
          <ul className="mt-3" data-testid="list" >
            {joinableMatches.map((element) =>
              <li className="policy" key={element.id} >
                {element.name}
                <button className="my-btn my-btn-list" onClick={() => handleJoin(element.id)} data-testid={`button_${element.name}`} > Join </button>
              </li>)}
          </ul>
          <div id="select-robot">
            <label className="form-label"> Select a robot to join a match: </label>
            <select className="form-select my-form-control" data-testid="select_robot" key="robots" name="id_robot" onChange={(event) => setSelectedRobot(event.target.value)} required>
              <option value="">-select your robot-</option>
              {
                robots.map((element) => <option key={element.id} data-test={`option_${element.id}`} value={element.id}>{element.name}</option>)
              }
            </select>
          </div>
          {error && <div>{error}</div>}
        </div>
      </div>
    </>
  )
}

export default ListMatches;