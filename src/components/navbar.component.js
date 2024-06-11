import { Link } from "react-router-dom";
import logo from "../images/fridgey.PNG";
import "./component-css/navbar.component.css";

function Navbar() {
  return (
    <nav>
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Logo" className="logoImage" />
      </Link>

      <div className="nav-links">
        <ul>
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Items
            </Link>
          </li>

          <li className="navbar-item">
            {/* change this directory */}
            <Link to="/scan" className="nav-link">
              Scan Item
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/create" className="nav-link">
              Add Item
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/user" className="nav-link">
              Create User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
