import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Item = (props) => (
  <tr>
    <td>{props.item.username}</td>
    <td>{props.item.itemName}</td>
    <td>{props.item.expirationDate.substring(0, 10)}</td>
    <td>{props.item.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.item._id}>edit</Link> |{" "}
      <button
        onClick={() => {
          props.deleteItem(props.item._id);
        }}
        style={{
          textDecoration: "underline",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "light-blue",
        }}
      >
        delete
      </button>
    </td>
  </tr>
);

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/items/")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  return (
    <div>
      <h3>Logged Items</h3>
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
