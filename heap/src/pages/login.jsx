import React from "react";
import "../components/Login.css";

export default function Login() {
  return (
    <div className="login-wrapper">
      <h1 className="title">LOGIN</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div className="button-container">
          <button className="btn btn-wide">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
