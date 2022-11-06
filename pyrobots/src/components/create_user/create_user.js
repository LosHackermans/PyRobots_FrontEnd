import { useState } from "react";
import axios from "axios";
import '../../css/forms.css';

function Create_user() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: ""
  });

  const [message, setMessage] = useState('')
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUser({...user, [name]: value});
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUser({...user, [e.target.name]: reader.result})
    }
  }

  const handleSubmit = (event) => { 
    event.preventDefault();
    setMessage('');

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/create_user`, {
      email: user.email,
      username: user.name,
      password: user.password,
      avatar: user.avatar
    }).then(response => {
      if(response.status === 200){
        setMessage(response.data.message)
      }
    }).catch(error => {
      if(error.response?.data?.detail){
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
        <div className="mb-3">
          <label className='form-label'>Name: </label>
          <input className='form-control' type="text" name="name" placeholder="enter your name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className='form-label'>Email: </label>
          <input className='form-control' type="text" name="email" placeholder="enter your email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className='form-label'>Password: </label>
          <input className='form-control' type="password" name="password" placeholder="enter your password" onChange={handleChange} required />
        </div>
        <div className="mb-3" >
          <label className='form-label' >Avatar (optional): </label>
          <input className='form-control' type="file" name="avatar" accept="image/png, image/jpeg" placeholder="robot_avatar" onChange={handleImageChange} />
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
        {message ? <p>{message}</p> : null }
        <p>{error}</p>
      </form>
    </>
  );
}

export default Create_user;