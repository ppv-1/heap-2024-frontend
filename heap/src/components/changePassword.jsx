import React, { Component } from "react";
import "./css/ResetPassword.css";
// import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import withNavigate from "./withNavigate";
import validator from "validator";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
    //   this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    //   this.changePasswordHandler = this.changePasswordHandler.bind(this);
    //   this.loginSubmit = this.loginSubmit.bind(this);
  }

  // changeUsernameHandler = (event) => {
  //   this.setState({ username: event.target.value });
  // };

  // changePasswordHandler = (event) => {
  //   this.setState({ password: event.target.value });
  // };

  handleChangePassword = (event) => {
    const password = event.target.value;
    this.setState({ password }, () => {
      // Call validate function whenever the password input changes
      this.validatePassword(password);
    });
  };

  handleChangeConfirmPassword = (event) => {
    const confirmPassword = event.target.value;
    this.setState({ confirmPassword }, () => {
      // Call validate function whenever the confirm password input changes
      this.validatePassword(this.state.password, confirmPassword);
    });
  };

  validatePassword = (password, confirmPassword = null) => {
    if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      if (confirmPassword && password !== confirmPassword) {
        this.setState({ errorMessage: "Passwords do not match" });
      } else {
        this.setState({ errorMessage: "Is Strong Password" });
      }
    } else {
      this.setState({ errorMessage: "Is Not Strong Password" });
    }
    
  };

  handleChangePasswordClick = () => {
    this.props.navigate("/profile");
  };

  render() {
    const { password, confirmPassword, errorMessage } = this.state;
    return (
      <>
        <div className="change-wrapper">
          <h1 className="title">Reset Password</h1>
          <form>
            <label>
              <p>Enter current password</p>
              <input required type="password" value={password} />
            </label>
            <label>
              <p>Enter new password</p>
              <input
                required
                type="password"
                value={password}
                onChange={this.handleChangePassword}
              />
            </label>
            <label>
              <p>Re-enter new password</p>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={this.handleChangeConfirmPassword}
              />
            </label>
            <div className="error-message">{errorMessage}</div>
            <div className="button-container">
              <button
                className="btn btn-wide"
                disabled={errorMessage !== "Strong Password"}
                onClick={this.handleChangePasswordClick}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigate(ChangePassword);
