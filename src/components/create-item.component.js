import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function CreateItem() {
  const [username, setUsername] = useState("");
  const [itemName, setItemName] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const userInput = useRef();

  useEffect(() => {
    axios.get("http://localhost:3000/users/").then((response) => {
      if (response.data.length > 0) {
        setUsers(response.data.map((user) => user.username));
        setUsername(response.data[0].username);
      }
    });
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeItemName = (e) => {
    setItemName(e.target.value);
  };

  const onChangeExpirationDate = (date) => {
    setExpirationDate(date);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const item = {
      username: username,
      itemName: itemName,
      expirationDate: expirationDate,
      date: date,
    };

    console.log(item);

    axios
      .post("http://localhost:3000/items/add", item)
      .then((res) => console.log(res.data));

    // takes back to homepage
    window.location = "/";
  };

  return (
    <div>
      <h3>Create New Item Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={userInput}
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Item Name: </label>
          <input
            type="text"
            required
            className="form-control"
            value={itemName}
            onChange={onChangeItemName}
          />
        </div>
        <div className="form-group">
          <label>Expiration Date: </label>
          <div>
            <DatePicker
              selected={expirationDate}
              onChange={onChangeExpirationDate}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Date Added: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Item Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateItem;
