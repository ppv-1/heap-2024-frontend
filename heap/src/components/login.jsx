import React, { Component } from "react";
import "./css/Login.css";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import AuthService from "../services/AuthService";
import { ProtectedAPI } from "../services/ProtectedAPI";
import OrgService from "../services/OrgService";
import AlertComponent from "./alert";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showLoginAlert: false,
      errorMessage: "",
      showUnauthorisedAlert: false,
    };
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("Unauthorised")) {
      this.setState({ showUnauthorisedAlert: true }, () => {
        console.log("showUnauthorisedAlert set to true");
        setTimeout(() => {
          this.setState({ showUnauthorisedAlert: false }, () => {
            console.log("showErrorAlert set to false");
          });
        }, 3000);
      });
    }
    localStorage.removeItem("Unauthorised");
  }

  loginSubmit = (event) => {
    event.preventDefault();
    let credentials = {
      email: this.state.username,
      password: this.state.password,
    };
    console.log("cred=" + credentials.email);
    AuthService.loginUser(credentials)
      .then((res) => {
        if (res.data) {
          console.log("success");
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userType", res.data.userType);
          ProtectedAPI.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;
          // navigate('/organisations');
          // return redirect('/organisations');
          // console.log(res.data.userType);
          // this.props.navigate("/user-profile");
          if (res.data.userType === "V") {
            console.log(res.data.userType);
            this.props.navigate("/user-profile", {
              state: { showLoginAlert: true },
            });
          } else if (res.data.userType === "O") {
            console.log(res.data.userType);
            this.props.navigate("/org-profile", {
              state: { showLoginAlert: true },
            });
          } else if (res.data.userType === "A") {
            console.log(res.data.userType);
            this.props.navigate("/", { state: { showLoginAlert: true } });
          }
          // this.props.navigate("/user-profile");
        } else {
          console.log("failure");
          console.log(res.data);
          this.setState({
            errorMessage: "Incorrect email or password. Please try again.",
          });
        }
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("Error logging in:", error);

        if (error.response) {
          console.log(
            "Server responded with error status:",
            error.response.status
          );
          if (error.response.status === 403) {
            this.setState({
              errorMessage: "Incorrect email or password. Please try again.",
            });
          }
          // else if (
          //   error.response.status === 403 &&
          //   OrgService.getOrg(credentials.email)
          // ) {
          //   console.log("org=" + OrgService.getOrg(credentials.email));
          //   this.setState({
          //     errorMessage: "Your organisation has not been verified by admin.",
          //   });
          // }
          else {
            this.setState({
              errorMessage: "An error occurred. Please try again later.",
            });
          }
        }
      });
  };

  changeUsernameHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { errorMessage, showUnauthorisedAlert } = this.state;
    console.log(this.state);
    console.log("showUnauthorisedAlert at render:", showUnauthorisedAlert);

    return (
      <>
        <div className="fixed bottom-4 right-4 z-50">
          <AlertComponent
            showAlert={this.state.showUnauthorisedAlert}
            alertType="warning"
            alertMessage="An error occurred. Please login or sign up."
          />
        </div>

        <div className="content">
          <h1 className="title">LOGIN</h1>
          <form>
            <label>
              <p>Email</p>
              <input
                required
                type="email"
                value={this.state.username}
                onChange={this.changeUsernameHandler}
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

            <div className="forgot-password">
              <a className="link link-hover" href="/forget-password">
                Forgot password
              </a>
            </div>
            <span className="error-message">{errorMessage}</span>
            <div className="button-container">
              <button className="btn btn-wide" onClick={this.loginSubmit}>
                Login
              </button>
            </div>
            <br />
            <p>Don't have an account?</p>
            <div className="button-container">
              <Link to="/register-volunteer">
                <button className="btn btn-wide">
                  Sign up here (Volunteer)
                </button>
              </Link>
            </div>
            <div className="button-container">
              <Link to="/register-organisation">
                <button className="btn btn-wide">
                  Sign up here (Organisation)
                </button>
              </Link>
            </div>
            <div className="button-container">
              <Link to="/register-admin">
                <button className="btn btn-wide">Create admin account</button>
              </Link>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(Login);
