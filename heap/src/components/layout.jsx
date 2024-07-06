import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <Navbar key={location.pathname} />
      <div className="content">{children}</div>
      
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
