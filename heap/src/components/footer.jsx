import React from "react";
// import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer text-neutral">
      <div className="footer-logo">
        <img src={logo} alt="logo" />
      </div>
      <p className="footer-text">
        Copyright © {new Date().getFullYear()} - All right reserved
      </p>
    </footer>
  );
};

export default Footer;
