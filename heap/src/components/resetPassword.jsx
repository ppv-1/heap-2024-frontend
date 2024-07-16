import React, { Component } from "react";
import "./css/Create.css";
import { useParams } from "react-router-dom";
import withNavigate from "./withNavigateandLocation";
import validator from "validator";
import withNavigateandLocation from "./withNavigateandLocation";
import AuthService from "../services/AuthService";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      this.setState({ errorMessage2: "Is Strong Password" });
    }
  };

  handleResetPasswordClick = async () => {
    const { token } = this.props.params;
    console.log(token);
    console.log(this.state.password);
    let data = { newPassword: this.state.password };
    await AuthService.resetPassword(token, data);
    // this.props.navigate("/login");
  };

  render() {
    const { password, confirmPassword, errorMessage1,  errorMessage2} = this.state;
    return (
      <div className="content">
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
          <span className="error-message">{errorMessage1}</span>
          <label>
            <p>Confirm password</p>
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={this.handleChangeConfirmPassword}
            />
          </label>
          <span className="error-message">{errorMessage2}</span>
          <div className="button-container">
            <button
              className="btn btn-wide"
              // disabled={errorMessage !== "Strong Password"}
              onClick={this.handleResetPasswordClick}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withNavigateandLocation((props) => (
  <ResetPassword {...props} params={useParams()} />
));
