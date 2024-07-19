import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";
import "./css/Layout.css";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <Navbar key={location.pathname} />
      <div className="main-body">
        {children}
        <Outlet />
      </div>
        <div className="footer-space"></div>
      <Footer />
    </>
  );
};

export default Layout;
