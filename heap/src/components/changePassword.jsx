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
      errorMessage1: "",
      errorMessage2: "",

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
    this.setState({ password: password}, () => {
      this.validatePassword(password, this.state.password);
    });
  };

  handleChangeConfirmPassword = (event) => {
    const confirmPassword = event.target.value;
    this.setState({ confirmPassword }, () => {
      this.validateConfirmPassword(this.state.password, confirmPassword);
    });
  };

  validatePassword = (password) => {
    if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      this.setState({ errorMessage1: "" });
    } else {
      this.setState({
        errorMessage1:
          "Password should be at least 8 characters, and contain at least one lowercase character, uppercase character, number and symbol.",
      });
    }
  };
  
  validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      this.setState({ errorMessage2: "Passwords do not match" });
    } else {
      this.setState({ errorMessage2: "" });
    }
  };

  handleChangePasswordClick = (event) => {
    event.preventDefault();
    const { state } = this.props.location;
    let data = {oldPassword: this.state.currentPassword, newPassword: this.state.password};
    UserService.changePassword(data).then((res) => {
      console.log(res.data);
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

  cancel = async (e) => {
    e.preventDefault();
    this.props.navigate("/user-profile");
  };

  render() {
    const { password, confirmPassword, errorMessage1,  errorMessage2} = this.state;
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
            <span className="error-message">{errorMessage1}</span>
            <label>
              <p>Confirm new password</p>
              <input
                required
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChangeConfirmPassword}
              />
            </label>
            <span className="error-message">{errorMessage2}</span>
            <div className="button-container">
              <button
                  className="btn btn-wide"
                  onClick={this.handleChangePasswordClick}
              >
                Change Password
              </button>
              <button className="btn" onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(ChangePassword);
