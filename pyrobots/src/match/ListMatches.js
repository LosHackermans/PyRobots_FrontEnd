import { useState, useEffect } from 'react'
import axios from 'axios';


function ListMatches() {

  const [createdMaches, setCreatedMatches] = useState([]);
  const [joinableMatches, setJoinableMatches] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/matches`)
      .then(function (response) {
        setCreatedMatches(response.data.PartidasDeUsuario);
        setJoinableMatches(response.data.PartidasParaUnirse);
      })
      .catch(function (error) {
        setCreatedMatches([]);
        setJoinableMatches([]);
      });
  }, []);
  
  return (
    <>
      <h2>Matches list</h2>
      <div>
        <h3>Your matches:</h3>
        <ul>
          {createdMaches.map((element) => <li key={element.id} > {element.name} </li>)}
        </ul>
      </div>
      <div>
        <h3>Matches to join:</h3>
        <ul>
          {joinableMatches.map((element) => <li key={element.id} > {element.name} </li>)}
        </ul>
      </div>
    </>
  )
}

export default ListMatches;