import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import "../css/Upload.css"

export const Upload = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("avatar", data.avatar[0]);
    formdata.append("code", data.code[0]);

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/upload_robot`, formdata)
      .then((response) => {
        if (response === 201) {
          alert("Your bot has been uploaded correctly!");
          Navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="animate__animated animate__zoomInDown">
      <h2>Upload a robot</h2>
      <div className="upload-container">
        <form
          className="col-lg-4 offset-lg-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group mb-3">
            <label className="form-label ">Name: </label>
            <span className="text-danger"> {errors?.name?.message} </span>
            <input
              className="form-control"
              placeholder="Robot name"
              type="text"
              {...register("name", {
                required: { value: true, message: "a name is required" },
              })}
            />
            <p className="form-text">Pick a name for your robot</p>
          </div>
          <div className="form-group">
            <label className="form-label">Avatar (optional): </label>
            <input
              type="file"
              className="form-control"
              accept="image/png, image/jpeg"
              placeholder="robot_avatar"
              {...register("avatar", {
                required: false,
              })}
            />
            <p className="form-text">
              You can give your robot some personality
            </p>
          </div>
          <div className="form-group">
            <label className="form-label">Robot code: </label>
            <span className="text-danger"> {errors?.code?.message} </span>
            <input
              className="form-control"
              type="file"
              placeholder="robot_file"
              accept=".py"
              {...register("code", {
                required: { value: true, message: "the code is required" },
              })}
            />
            <p className="form-text">
              The code will be the consciousness of your robot
            </p>
          </div>
          <div className="col text-center">
            <button type={"submit"} className="btn btn-dark">
              Upload
            </button>
            {error && (
              <div>
                <span className="text-danger">{error}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
