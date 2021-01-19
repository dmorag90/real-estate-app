import React from "react";
const Input = ({ name, label, type, min, max, step, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        type={type}
        min={min}
        max={max}
        step={step}
        className="form-control"
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
