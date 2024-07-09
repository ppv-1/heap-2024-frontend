import React, { Component } from "react";
import AuthService from "../services/AuthService";
import "./css/Signup.css";
import withNavigateandLocation from "./withNavigateandLocation";

class RegisterAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      contactNo: "",
      email: "",
      password: "",
      showLoginAlert: false,
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeContactNoHandler = this.changeContactNoHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  createUser = (e) => {
    e.preventDefault();
    let user = {
      fullName: this.state.name,
      contactNo: this.state.contactNo,
      email: this.state.email,
      password: this.state.password,
    };
    console.log("user (admin) => " + JSON.stringify(user));

    AuthService.createAdmin(user).then((res) => {
      this.props.navigate("/");
    });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
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
        <div className="content">
          <h1 className="title">Creating Admin</h1>

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
                Create Admin
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(RegisterAdmin);
