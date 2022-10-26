import React from "react";

export const FormType = ({text, type, id, ph, handleInputChange}) => {
  return (
    <div className="form-group mb-3">
      <label className="form-label ">{text}</label>
      <input
        className="form-control"
        data-testid= {id}
        placeholder={ph}
        type={type}
        onChange={handleInputChange}
      />
    </div>
  );
};
