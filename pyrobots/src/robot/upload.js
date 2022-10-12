import { useState } from "react";
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name: </label>
          <input type="text" {...register("name", {
            required: {value: true, message:"A name is required"}
          })}/>
          <span> {errors?.name?.message} </span>
        </div>
        <div>
          <label>Avatar: </label>
          <input 
            type="file" 
            accept="image/png, image/jpeg" 
            {...register('avatar', {
            required:false
          })} />
        </div>
        <div>
          <label>Robot code: </label>
          <input type="file" accept=".py" {...register('code', {
            required: {value: true, message:"A code is required"}
          })} />
          <span> {errors?.code?.message} </span>
        </div>
        
        
        <input type={"submit"} value="Upload" />
      </form>
      {error && <span>{error}</span>}
    </div>
  }

export default Upload;