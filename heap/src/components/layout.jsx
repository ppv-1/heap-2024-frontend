import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">{children}</div>
      <Outlet />
    </>
  );
};
export default Layout;
