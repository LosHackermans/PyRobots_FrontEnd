import { useState } from "react";
import axios from "axios";

function Create_user() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState('')
  const [error, setError] = useState('');
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setUser({...user, [name]: value});
  }
  
  const handleSubmit = (event) => { 
    event.preventDefault();
    
    let options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(user)
    };

    axios.request(`/create_user`, options)
    .then(response => {
      if(response.status === 201){
        setMessage('user created successfully')
      }
    })
    .catch(error => 
      setError("Error: " + error.message)  
    )
  }

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="name" placeholder="enter your name" onChange={handleChange} required />
        <br />
        <br />
        <label>Email: </label>
        <input type="text" name="email" placeholder="enter your email" onChange={handleChange} required />
        <br />
        <br />
        <label>Password: </label>
        <input type="password" name="password" placeholder="enter your password" onChange={handleChange} required />
        <br />
        <br />
        <button type="submit">Register</button>
        {message ? <p>{message}</p> : null }
        <p>{error}</p>
      </form>
    </>
  );
}

export default Create_user;