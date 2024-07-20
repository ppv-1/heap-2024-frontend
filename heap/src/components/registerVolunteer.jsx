import React, { Component } from "react";
import UserService from "../services/UserService";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Signup.css";
import AuthService from "../services/AuthService";
import validator from "validator";

const getTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme;
  }

  const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
  ).matches;
  return systemPrefersDark ? "dim" : "light";
};

class RegisterVolunteer extends Component {
  constructor(props) {
    super(props);

    let theme = getTheme();

    this.state = {
      name: "",
      gender: "",
      contactNo: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage1: "",
      errorMessage2: "",
      errorMessage3: "",
      errorMessage4: "",
      theme: theme,
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeGenderHandler = this.changeGenderHandler.bind(this);
    this.changeContactNoHandler = this.changeContactNoHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  createUser = (e) => {
    e.preventDefault();
    let user = {
      fullName: this.state.name,
      gender: this.state.gender,
      contactNo: this.state.contactNo,
      email: this.state.email,
      password: this.state.password,
    };
    console.log("user => " + JSON.stringify(user));

    AuthService.createVolunteer(user).then((res) => {
      this.props.navigate("/login");
    });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeGenderHandler = (event) => {
    const selectedGender = event.target.value;
    let genderChar;

    if (selectedGender === "male") {
      genderChar = "M";
    } else if (selectedGender === "female") {
      genderChar = "F";
    } else if (selectedGender === "non-binary") {
      genderChar = "N";
    } else {
      genderChar = "O";
    }
    this.setState({ gender: genderChar });
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
    this.setState({ password: password}, () => {
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

  isFormComplete() {
    const { name, contactNo, email, gender, password, confirmPassword } =
      this.state;

    return (
      name !== "" &&
      contactNo !== "" &&
      email !== "" &&
      gender !== "" &&
      password !== "" &&
      confirmPassword !== ""
    );
  }

  render() {
    const { errorMessage1, errorMessage2, errorMessage3, errorMessage4 } = this.state;
    const isDarkMode = this.state.theme === "dim";
    const multiSelectClassName = isDarkMode ? "dark" : "";
    return (
      <>
        <div className="content">
          <h1 className="title">Sign Up</h1>

          <form>
            <label>
              <p>Name</p>
              <input
                type="text"
                value={this.state.name}
                onChange={this.changeNameHandler}
              />
            </label>
            <label>
              <p>Gender</p>
              <select
                  className={`select select-bordered w-full custom-select ${multiSelectClassName}`}
                onChange={this.changeGenderHandler}
              >
                <option disabled selected>
                  Select type
                </option>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
                <option value={"non-binary"}>Non-binary</option>
              </select>
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
              <p>Password</p>
              <input
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

export default withNavigateandLocation(RegisterVolunteer);
