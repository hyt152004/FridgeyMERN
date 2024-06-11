import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditItem = () => {
  const { id } = useParams();
  const userInput = useRef();

  const [username, setUsername] = useState("");
  const [itemName, setItemName] = useState("");
  const [date, setDate] = useState(new Date());
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/items/" + id)
      .then((response) => {
        setUsername(response.data.username);
        setItemName(response.data.itemName);
        setExpirationDate(response.data.expirationDate);
        setDate(new Date(response.data.date));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeItemName = (e) => {
    setItemName(e.target.value);
  };

  const onChangeExpirationDate = (e) => {
    setExpirationDate(e.target.value);
  };

  // const onChangeDate = (date) => {
  //   setDate(date);
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const item = {
      username: username,
      itemName: itemName,
      date: date,
    };

    console.log(item);

    axios
      .post("http://localhost:3000/items/update/" + id, item)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Item Log</h3>
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

        <br />
        <div className="form-group">
          <input type="submit" value="Edit Item Log" className="hero-btn" />
        </div>
      </form>
    </div>
  );
};

export default EditItem;
