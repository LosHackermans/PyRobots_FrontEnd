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


      if(user.password.length <= 8){
        setError("Enter a password with at least 8 characters");
      }else{
        setError('')
      }

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_user`, {
      email: user.email,
      username: user.name,
      password: user.password
    }).then(response => {
      if(response.status === 200){
        setMessage(response.data.message)
      }
    }).catch(error => {
      if(error.response.data.detail){
        setError(error.response.data.detail);  
      } else {
        setError('Server error');
      }
      
    })
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