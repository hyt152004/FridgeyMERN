import React, { useState } from "react";
import axios from "axios";
import "./component-css/create-user.component.css";

function CreateUser() {
  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
    };

    console.log(user);

    axios
      .post("http://localhost:3000/users/add", user)
      .then((res) => console.log(res.data));

    setUsername("");
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <br />
        <div className="form-group">
          <input type="submit" value="Create User" className="hero-btn" />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
