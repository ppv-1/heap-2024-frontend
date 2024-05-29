import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./components/Navbar.css";

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/opps">
            <p>Discover</p>
            <p>Opportunities</p>
          </Link>
        </li>
        <li>
          <Link to="/orgs">
            <p>Our</p>
            <p>Organisations</p>
          </Link>
        </li>
      </ul>
      <div className="spacer"></div>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <div className="spacer"></div>

      <div className="rightnav">
        <ul className="right-nav-list">
          {isLoggedIn ? (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;

<Navbar isLoggedIn={true} />