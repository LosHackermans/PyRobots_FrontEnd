import axios from "axios";
import { useState } from "react";
import { FormType } from "./FormType";
import "../css/CreateUser.css";

export const CreateUser = () => {

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

      if(user.password.length <= 8){
        setError("Enter a password with at least 8 characters");
      }else{
        setError('')
      }

    axios.request(`${process.env.REACT_APP_BACKEND_URL}/create_user`, options)
    .then(response => {
      if(response.status === 201){
        setMessage('user created successfully')
      }
    })
    .catch(error => {
      console.log(error);
      setError("an error has occurred");  
    })
  }

  return (
    <div className="sign-up-container animate__animated animate__zoomInDown">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <FormType text="Name" type="name" id="exampleInputname" ph="Enter Name" handleChange={handleChange}></FormType>
        <FormType text="Email address" type="email" id="exampleInputEmail1" ph="Enter email" handleChange={handleChange}></FormType>
        <FormType text="Password" type="password" id="exampleInputPassword1" ph="Password" handleChange={handleChange}></FormType>
        <button type="submit" className="btn btn-dark">
          Register
        </button>
        {message ? <p>{message}</p> : null}
        <p>{error}</p>
      </form>
    </div>
  );
}

