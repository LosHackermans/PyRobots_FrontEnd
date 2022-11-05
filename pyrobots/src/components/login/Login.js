import { useState } from 'react'
import { setToken, fetchToken } from '../../helpers/Auth'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// to logout: localStorage.removeItem("userToken");

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setErrors] = useState('')

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const login = (event) => {
    event.preventDefault();
    if (user.email === '' || user.password === '') {
      setErrors("empty field");
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email: user.email,
        password: user.password
      })
        .then(function (response) {
          if (response.data.token) {
            setToken(response.data.token);
            navigate("/");
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
      <h2>Login</h2>
      {fetchToken() ? (<p>You are logged in!</p>) : (
        <form onSubmit={login}>
          <label>Email: </label>
          <input type='email' name="email" onChange={handleInputChange} />
          <label>Password: </label>
          <input type='password' name="password" onChange={handleInputChange} />
          <button type='submit'>Login</button>
          {error && <div>{error}</div>}
        </form>
      )
      }
    </>
  )
}

export default Login;