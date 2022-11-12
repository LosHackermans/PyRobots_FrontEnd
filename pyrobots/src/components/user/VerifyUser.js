import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/user/VerifyUser.css";

function VerifyUser() {

  const navigate = useNavigate();
  const [verification, setVerification] = useState({
    code: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVerification({ ...verification, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    if (verification.code === '') {
      setError('A code is required');
      return;
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/validate_user`, verification)
      .then((response) => {
        if (response.status === 200) {
          window.alert(response.data.detail);
          navigate('/login');
        };
      }).catch((error) => {
        if (error.response?.data?.detail) {
          setError(error.response.data.detail);
        } else {
          setError('Server error');
        }
      })
  }

  return (
    <div className="container">
      <div className="row justify-content-center pt-5 mt-5 mr-1">
        <div className="col-md-6 box text-center">
          <h2>User verification</h2>
          <hr></hr>
          <form onSubmit={handleSubmit} >
            <div>
              <p>Verifying your account will allow you to log in and enjoy all the features of pyRobots.</p>
              <label>Enter your verification code: </label>
              <br />
              <input type="text" name="code" onChange={handleChange} data-testid="code_input" required ></input>
            </div>
            <div className="d-grid gap-2 col-3 mx-auto mt-4">
              <button type="submit" className="my-btn" data-testid="validate_button" >Verify user</button>
            </div>
          </form>
          {error && <div className="alert-error" >
            <strong>Error: </strong> {error}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;