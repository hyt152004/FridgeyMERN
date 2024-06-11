import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState } from "react";

import Navbar from "./components/navbar.component";
import ItemsList from "./components/items-list.component";
import EditItem from "./components/edit-item.component";
import CreateItem from "./components/create-item.component";
import CreateUser from "./components/create-user.component";
import ScanItem from "./components/scan-item.component";

import fridgeyClosed from "./images/fridgey-closed.png";
import fridgeyOpened from "./images/fridgey-opened.png";

function App() {
  document.title = "Fridgey";

  const [fridgey_img_state, set_fridgey_img_state] = useState(fridgeyClosed);

  // Event handlers
  const handleMouseEnter = () => {
    set_fridgey_img_state(fridgeyOpened);
  };

  const handleMouseLeave = () => {
    set_fridgey_img_state(fridgeyClosed);
  };

  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Routes>
          <Route path="/" element={<ItemsList />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/user" element={<CreateUser />} />
          <Route path="/scan" element={<ScanItem />} />
        </Routes>
      </div>
      <div className="fridgey-functional">
        <Link to="/" className="fridgey-link">
          <img
            src={fridgey_img_state}
            alt="fridgeyClosed"
            className="fridgey-allItem-img"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>
      </div>
    </Router>
  );
}

export default App;
