import { useState } from "react";
import { setToken, fetchToken } from "../helpers/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

export const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setErrors] = useState("");

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const login = (event) => {
    event.preventDefault();
    if (user.email === "" || user.password === "") {
      setErrors("empty field");
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          email: user.email,
          password: user.password,
        })
        .then(function (response) {
          if (response.data.token) {
            setToken(response.data.token);
            navigate("/");
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
      <h1>Login</h1>
      <div className="login-container">
        {fetchToken() ? (
          <p>You are logged in!</p>
        ) : (
          <form onSubmit={login}>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              className="form-control"
            />
            <label>Password: </label>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              className="form-control"
            />
            <div className="container-button">
              <button type="submit" className="btn btn-dark">
                Login
              </button>
            </div>
            {error && <div>{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
};
