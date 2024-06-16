import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <Navbar key={location.pathname} />
      <div className="content">{children}</div>
      <Outlet />
    </>
  );
};

export default Layout;
