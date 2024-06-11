import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./component-css/items-list.component.css";

const Item = (props) => (
  <tr>
    <td>{props.item.username}</td>
    <td>{props.item.itemName}</td>
    <td>{props.item.expirationDate.substring(0, 10)}</td>
    <td>{props.item.date.substring(0, 10)}</td>
    <td>
      <Link style={{ color: "blue" }} to={"/edit/" + props.item._id}>
        edit
      </Link>{" "}
      |{" "}
      <button
        onClick={() => {
          props.deleteItem(props.item._id);
        }}
        style={{
          textDecoration: "underline",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "blue",
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/items/")
      .then((response) => {
        setItems(response.data);
        // sortItemsByExpirationDate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortItemsByExpirationDate = (itemsToSort) => {
    const sortedItems = [...itemsToSort].sort((a, b) => {
      return new Date(a.expirationDate) - new Date(b.expirationDate);
    });
    setItems(sortedItems);
  };

  const deleteItem = (id) => {
    axios.delete("http://localhost:3000/items/" + id).then((response) => {
      console.log(response.data);
    });

    setItems(items.filter((el) => el._id !== id));
  };

  const itemList = () => {
    return items.map((currentItem) => {
      return (
        <Item
          item={currentItem}
          deleteItem={deleteItem}
          key={currentItem._id}
        />
      );
    });
  };

  const searchInputHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const searchHandler = () => {
    let item = items.filter((el) => el.itemName === searchValue);
    if (item.length <= 0) {
      return;
    }

    item = item[0];
    window.location = "/edit/" + item._id;
  };

  return (
    <div>
      <h3>Logged Items</h3>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search Item!"
          value={searchValue}
          onChange={searchInputHandler}
        />
        <button className="hero-btn" onClick={searchHandler}>
          search
        </button>
      </div>

      <button
        onClick={() => {
          sortItemsByExpirationDate(items);
          setIsSorted(true);
        }}
        className="sortButton hero-btn"
        disabled={isSorted}
      >
        Sort by Closest Expiration Date
      </button>
      <br></br>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Added By</th>
            <th>Item Name</th>
            <th>Expiration Date</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{itemList()}</tbody>
      </table>
    </div>
  );
};

export default ItemsList;
