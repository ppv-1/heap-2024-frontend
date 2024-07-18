import React, { Component } from "react";
import UserService from "../services/UserService";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Signup.css";
import AuthService from "../services/AuthService";
import validator from "validator";

class RegisterOrganisation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      contactNo: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: "",
      website: "",
      description: "",
      errorMessage: "",
      errorMessage1: "",
      errorMessage2: "",
      errorMessage3: "",
      errorMessage4: "",
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeContactNoHandler = this.changeContactNoHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeLocationHandler = this.changeLocationHandler.bind(this);
    this.changeWebsiteHandler = this.changeWebsiteHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  createUser = (e) => {
    e.preventDefault();
    let user = {
      email: this.state.email,
      fullName: this.state.name,
      password: this.state.password,
      contactNo: this.state.contactNo,
      location: this.state.location,
      website: this.state.website,
      description: this.state.description,
    };
    console.log("user => " + JSON.stringify(user));

    AuthService.createOrganisation(user)
      .then((res) => {
        this.props.navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering organisation:", error);

        if (error.response) {
          console.log(
            "Server responded with error status:",
            error.response.status
          );
          if (error.response.status === 403) {
            this.setState({
              errorMessage: "An error occurred. Please try again later.",
            });
          } else {
            this.setState({
              errorMessage: "An error occurred. Please try again later.",
            });
          }
        }
      });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeContactNoHandler = (event) => {
    const contactNo = event.target.value;
    this.setState({ contactNo }, () => {
      this.validateContactNo(contactNo);
    });
  };

  validateContactNo = (contactNo = null) => {
    if (validator.isMobilePhone(contactNo, "en-SG")) {
      this.setState({ errorMessage1: "" });
    } else {
      this.setState({ errorMessage1: "Invalid contact number" });
    }
  };

  changeEmailHandler = (event) => {
    const email = event.target.value;
    this.setState({ email }, () => {
      this.validateEmail(email);
    });
  };

  validateEmail = (email = null) => {
    if (validator.isEmail(email)) {
      this.setState({ errorMessage2: "" });
    } else {
      this.setState({ errorMessage2: "Invalid email" });
    }
  };

  changePasswordHandler = (event) => {
    const password = event.target.value;
    this.setState({ password: password }, () => {
      this.validatePassword(password, this.state.password);
    });
  };

  handleConfirmPassword = (event) => {
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
      this.setState({ errorMessage3: "" });
    } else {
      this.setState({
        errorMessage3:
          "Password should be at least 8 characters, and contain at least one lowercase character, uppercase character, number and symbol.",
      });
    }
  };

  validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      this.setState({ errorMessage4: "Passwords do not match" });
    } else {
      this.setState({ errorMessage4: "" });
    }
  };

  changeLocationHandler = (event) => {
    this.setState({ location: event.target.value });
  };

  changeWebsiteHandler = (event) => {
    this.setState({ website: event.target.value });
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  isFormComplete() {
    const { name, contactNo, email, location, password, confirmPassword } =
      this.state;

    return (
      name !== "" &&
      contactNo !== "" &&
      email !== "" &&
      location !== "" &&
      password !== "" &&
      confirmPassword !== ""
    );
  }

  render() {
    const { errorMessage, errorMessage1, errorMessage2, errorMessage3, errorMessage4 } =
      this.state;
    return (
      <>
        <div className="content">
          <h1 className="title">Sign Up</h1>

          <form>
            <label>
              <p>Organisation Name</p>
              <input
                type="text"
                required
                value={this.state.name}
                onChange={this.changeNameHandler}
              />
            </label>
            <label>
              <p>Contact Number</p>
              <input
                type="tel"
                required
                value={this.state.contactNo}
                onChange={this.changeContactNoHandler}
              />
            </label>
            <span className="error-message">{errorMessage1}</span>
            <label>
              <p>Email Address</p>
              <input
                type="email"
                required
                value={this.state.email}
                onChange={this.changeEmailHandler}
              />
            </label>
            <span className="error-message">{errorMessage2}</span>
            <label>
              <p>Organisation Address</p>
              <input
                required
                type="text"
                value={this.state.location}
                onChange={this.changeLocationHandler}
              />
            </label>
            <label>
              <p>Organisation Website (Optional)</p>
              <input
                type="text"
                value={this.state.website}
                onChange={this.changeWebsiteHandler}
              />
            </label>
            <label>
              <p>Organisation Description (Optional)</p>
              <textarea
                value={this.state.description}
                onChange={this.changeDescriptionHandler}
              />
            </label>
            <label>
              <p>Password</p>
              <input
                required
                type="password"
                value={this.state.password}
                onChange={this.changePasswordHandler}
              />
            </label>
            <span className="error-message">{errorMessage3}</span>
            <label>
              <p>Confirm password</p>
              <input
                required
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPassword}
              />
            </label>
            <span className="error-message">{errorMessage4}</span>
            <span className="error-message">{errorMessage}</span>
            <div className="button-container">
              <button
                className="btn btn-wide"
                onClick={this.createUser}
                disabled={!this.isFormComplete()}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(RegisterOrganisation);
