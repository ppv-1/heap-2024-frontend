import React, { Component } from "react";
import UserService from "../services/UserService";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Signup.css";
import AuthService from "../services/AuthService";

class RegisterVolunteer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      gender: '',
      contactNo: "",
      email: "",
      password: "",
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

    if (selectedGender === 'male') {
      genderChar = 'M';
    } else if (selectedGender === 'female') {
      genderChar = 'F';
    } else if (selectedGender === 'non-binary') {
      genderChar = 'N';
    } else {
      genderChar = 'O';
    }
    this.setState({ gender: genderChar });
  };

  changeContactNoHandler = (event) => {
    this.setState({ contactNo: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <>
        <div className="signup-wrapper">
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
                className="select select-bordered w-full"
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
                pattern="[0-9]{4}-[0-9]{4}"
                required
                value={this.state.contactNo}
                onChange={this.changeContactNoHandler}
              />
            </label>
            <label>
              <p>Email Address</p>
              <input
                type="email"
                required
                value={this.state.email}
                onChange={this.changeEmailHandler}
              />
            </label>
            <label>
              <p>Password</p>
              <input
                type="password"
                value={this.state.password}
                onChange={this.changePasswordHandler}
              />
            </label>
            <div className="button-container">
              <button className="btn btn-wide" onClick={this.createUser}>
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
