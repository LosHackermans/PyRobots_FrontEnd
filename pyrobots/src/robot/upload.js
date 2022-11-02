import axios from "axios";
import { useState } from "react";

function Upload() {

  const [robot, setRobot] = useState({
    name: '',
    avatar: '',
    script: ''
  });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("")
    if (robot.name === '') {
      setError("A name is required");
      return
    } else if (robot.script === '') {
      setError("A script is required");
      return
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload_robot`, robot)
      .then((response) => {
        if(response.status === 200) {
          alert(response.data.detail);
        };
      }).catch((error) => {
        if(error.response?.data?.detail){
          setError(error.response.data.detail);  
        } else {
          setError('Server error');
        }
      })
    }

    const handleFileChange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setRobot({...robot, [e.target.name]: reader.result})
      }
      reader.onerror = () => {
        console.log("file error", reader.error)
      }
    }

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setRobot({...robot, [e.target.name]: reader.result})
      }
    }

    const handleInputChange = (event) => {
      setRobot({
        ...robot,
        [event.target.name]: event.target.value
      })
    }

  return <div>
    <h2>Upload robot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input placeholder="robot_name" onChange={handleInputChange} name="name" type="text" />
        </div>
        <div >
          <label >Avatar (optional): </label>
          <input type="file" name="avatar" accept="image/png, image/jpeg" placeholder="robot_avatar" onChange={handleImageChange} />
        </div>
        <div>
          <label >Robot code: </label>
          <input type="file" name="script" placeholder="robot_file" accept=".py" onChange={handleFileChange} />
        </div>
        <div>
        <button type='submit'>Upload</button>
          {error && <div><span >{error}</span></div>}
        </div>
      </form>
    </div>
  }

export default Upload;