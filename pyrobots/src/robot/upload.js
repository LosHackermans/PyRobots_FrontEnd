import { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

function Upload() {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = (data, event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/upload_robot`, {
      method:'POST',
      headers: { "content-type": "aplication-json" },
      body: JSON.stringify(data)
    }).then((response) => {
      //view api response. It shoud notify to user that robot has been added.
      console.log("robot sent!");
      Navigate("/");
    }).catch((error) => {
      setError(error.message);
    });
  }

  return <div>
    <h2>Upload robot</h2>
      <form className="col-lg-6 offset-lg-3 " onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3" >
          <label className="form-label"  >Name: </label>
          <span className="text-danger" > {errors?.name?.message} </span>
          <input className="form-control" id="robot_name" type="text" {...register("name", {
            required: {value: true, message:"a name is required"}
          })}/>
          <p className="form-text" >Pick a name for your robot</p>
        </div>
        <div className="form-group" >
          <label className="form-label">Avatar: </label>
          <input 
            type="file"
            className="form-control" 
            accept="image/png, image/jpeg" 
            {...register('avatar', {
            required:false
          })} />
          <p className="form-text" >You can give your robot some personality</p>
        </div>
        <div className="form-group">
          <label className="form-label" >Robot code: </label>
          <span className="text-danger" > {errors?.code?.message} </span>
          <input className="form-control" type="file" accept=".py" {...register('code', {
            required: {value: true, message:"the code is required"}
          })} />
          <p className="form-text" >The code will be the consciousness of your robot</p>
        </div>
        <div className="col text-center">
          <Button type={"submit"} >Upload</Button>
        </div>
      </form>
      {error && <span>{error}</span>}
    </div>
  }

export default Upload;