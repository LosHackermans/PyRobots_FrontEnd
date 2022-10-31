import { useState, useEffect } from 'react'
import axios from 'axios';

function ListMatches() {

  const [createdMaches, setCreatedMatches] = useState([]);
  const [joinedMatches, setJoinedMatches] = useState([]);
  const [joinableMatches, setJoinableMatches] = useState([]);
  const [error, setError] = useState('');

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

  useEffect(() => {
    getMatches();
  }, []);
  
  return (
    <>
      <h2>Matches</h2>
      <button onClick={() => getMatches()} > Refresh </button>
      <div data-testid="created_matches">
        <h3>Created matches:</h3>
        <ul>
          {createdMaches.map((element) =>
          <li key={element.id} >
            {element.name}
          </li>)}
        </ul>
      </div>
      <div data-testid="joined_matches">
        <h3>Joined matches:</h3>
        <ul>
          {joinedMatches.map((element) =>
          <li key={element.id} >
            {element.name}
          </li>)}
        </ul>
      </div>
      <div data-testid="joinable_matches" >
        <h3>Matches to join:</h3>
        <ul>
          {joinableMatches.map((element) =>
          <li key={element.id} >
            {element.name}
          </li>)}
        </ul>
        {error && <div>{error}</div>}
      </div>
    </>
  )
}

export default ListMatches;