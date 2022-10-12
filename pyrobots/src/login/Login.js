import { useState } from 'react'
import { setToken, fetchToken } from '../common/Auth'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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

  const login = () => {
    if (user.email === '' && user.password === '') { return } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email: user.email,
        password: user.password
      })
        .then(function (response) {
          if (response.data.token) {
            setToken(response.data.token)
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
        <form>
          <label>Input Username: </label>
          <input type='email' name="email" onChange={handleInputChange} />
          <label>Input Password: </label>
          <input type='password' name="password" onChange={handleInputChange} />
          <button type='button' onClick={login}>Login</button>
          {error && <div>{error}</div>}
        </form>
      )
      }
    </>
  )
}

export default Login;