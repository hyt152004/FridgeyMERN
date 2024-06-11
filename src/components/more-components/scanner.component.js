import React, { useState, useEffect, useRef } from "react";
import "../component-css/scanner.component.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function ScanItem(props) {
  const [barcodeValue, setBarcodeValue] = useState(props.scannedCode);
  const [username, setUsername] = useState("");
  const [itemName, setItemName] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const date = new Date();
  const [users, setUsers] = useState([]);
  const userInput = useRef();
  const [error, setError] = useState(null);
  const API_Key = "REMOVED FOR GITHUB";

  useEffect(() => {
    setBarcodeValue(props.scannedCode);
  }, [props.scannedCode]);

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

  function getAPIdata() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url =
      proxyurl +
      "https://api.barcodelookup.com/v3/products?barcode=" +
      barcodeValue +
      "&formatted=y&key=" +
      API_Key;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setBarcodeValue(data.products[0].barcode_number);
        setItemName(data.products[0].title);
        setError(null);
      })
      .catch((err) => {
        // throw err;
        setError("Product not found");
      });
  }

  const onChangeBarcodeValue = (e) => {
    setBarcodeValue(e.target.value);
  };

  const handleRetry = () => {
    setError("");
    props.handleRescan();
  };

  return (
    <div>
      <strong>Barcode Number: </strong>
      <div>{barcodeValue ? barcodeValue : "N/A"}</div>
      <br />
      <strong>Item Name: </strong>
      <div>{barcodeValue ? itemName : "N/A"}</div>
      <br />
      {error && <p>Error: {error}</p>}
      <input
        type="text"
        required
        className="form-control"
        value={barcodeValue}
        onChange={onChangeBarcodeValue}
      />
      <br />
      <div className="scan-actions">
        <button className="sortButton hero-btn" onClick={getAPIdata}>
          Generate
        </button>

        <button className="sortButton hero-btn" onClick={handleRetry}>
          Retry
        </button>
      </div>
      <br />
      <br />
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
          <input
            type="submit"
            value="Create Item Log"
            className="sortButton hero-btn"
          />
        </div>
      </form>
    </div>
  );
}

export default ScanItem;
