import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className={input.name}>
      <label>{label}</label>
      <input
        data-cy={`input-${input.name}`}
        {...input}
        style={{ marginBottom: "5px" }}
      />
      <div
        data-cy={`input-${input.name}-error`}
        className="red-text"
        style={{ marginBottom: "20px" }}
      >
        {touched && error}
      </div>
    </div>
  );
};
