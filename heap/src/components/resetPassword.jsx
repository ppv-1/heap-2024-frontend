import React, { Component } from "react";
import "./css/ResetPassword.css";
// import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import withNavigate from "./withNavigateandLocation";
import validator from "validator";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  handleResetPasswordClick = () => {
    this.props.navigate("/login");
  };

  render() {
    const { password, confirmPassword, errorMessage } = this.state;
    return (
      <>
        <div className="reset-wrapper">
          <h1 className="title">Reset Password</h1>
          <form>
            <label>
              <p>Enter password</p>
              <input
                required
                type="password"
                value={password}
                onChange={this.handleChangePassword}
              />
            </label>
            <label>
              <p>Confirm password</p>
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
                onClick={this.handleResetPasswordClick}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigate(ResetPassword);
