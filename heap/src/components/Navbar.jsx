import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../logo.png";
import "./css/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  return (
    <nav className="navbar bg-base-100">
      <ul className="nav-list">
        <li>
          <Link to="/opportunities">
            <p>Discover</p>
            <p>Opportunities</p>
          </Link>
        </li>
        <li>
          <Link to="/organisations">
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

            userType === "O" ? (
            <>
              <li>
                <Link to="/create-opportunity">Create Event</Link>
              </li>
              <li>
                <Link to="/posted-event">View Posted Events</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
            ) : userType === "V" ? (
              <>
              <li>
                <Link to="/registered-event">View Registered Events</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
            ) : (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            )
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register-volunteer">Volunteer</Link>
              </li>
              <li>
                <Link to="/register-organisation">Organisation</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
