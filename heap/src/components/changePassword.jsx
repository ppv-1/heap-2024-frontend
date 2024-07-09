import React, { Component } from "react";
import "./css/Create.css";
import { Link } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import validator from "validator";
import withLocation from "./withLocation";
import UserService from "../services/UserService";

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

  handleChangePasswordClick = (event) => {
    event.preventDefault();
    const { state } = this.props.location;
    let data = {email: state.email, currentPassword: this.state.currentPassword, newPassword: this.state.password};
    UserService.changePassword(data).then((res) => {
      if (res.data) {
        console.log(res.data);
        this.props.navigate("/user-profile", {state: res.data});
      } else {
        console.log('fail');
      }
    })
  };

  changePasswordHandler = (event) => {
    this.setState({ currentPassword: event.target.value });
  };

  render() {
    // const { state } = this.props.location;
    // console.log(state);
    const { password, confirmPassword, errorMessage } = this.state;
    console.log(this.state);
    return (
      <>
        <div className="content">
          <h1 className="title">Change Password</h1>
          <form>
            <label>
              <p>Enter current password</p>
              <input required type="password" value={this.state.currentPassword} onChange={this.changePasswordHandler} />
            </label>
            <label>
              <p>Enter new password</p>
              <input
                required
                type="password"
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </label>
            <label>
              <p>Confirm new password</p>
              <input
                required
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChangeConfirmPassword}
              />
            </label>
            <div className="error-message">{errorMessage}</div>
            <div className="button-container">
              <button
                className="btn btn-wide"
                disabled={errorMessage !== "Is Strong Password" || this.state.confirmPassword === ""}
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

export default withNavigateandLocation(ChangePassword);
