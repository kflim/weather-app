import React from "react";

const SubmitSection = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div className="input-group mb-4 w-75 mx-auto">
        <input
          type="search"
          className="form-control"
          placeholder="Search City"
          aria-label="Search City"
          aria-describedby="basic-addon2"
          name="search-bar"
          value={props.input}
          onChange={(event) => props.onChange(event)}
          required
        />
        <button type="submit" className="input-group-text" id="basic-addon2">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SubmitSection;
