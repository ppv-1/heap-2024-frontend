import React, { Component } from "react";
import "./css/Profile.css";
import withNavigateandLocation from "./withNavigateandLocation";
import { Link } from "react-router-dom";
import logo from "../images//orgLogo.png";
import ToggleThemeComponent from "./toggleTheme.jsx";
import MediaService from "../services/MediaService.js";
import UserService from "../services/UserService.js";
import AlertComponent from "./alert.jsx";

class OrganisationProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      contactNo: "",
      website: "",
      description: "",
      profilePicture: null,
      showLoginAlert: false,
      showEditAlert: false,
    };
  }

  fetchData = async () => {
    try {
      const res = await UserService.getProfile();

      this.setState({
        fullName: res.data.fullName,
        contactNo: res.data.contactNo,
        email: res.data.email,
        website: res.data.website,
        description: res.data.description,
        profilePicture: res.data.pfp_filepath,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data.");
    }
  };

  changePasswordHandler = (event) => {
    event.preventDefault();
    this.props.navigate("/change-password");
  };

  EditProfileNavigate = (event) => {
    event.preventDefault();
    this.props.navigate(`/edit-org-profile`);
  };

  componentDidMount() {
    this.fetchData();

    if (this.props.location.state && this.props.location.state.showEditAlert) {
      this.setState({ showEditAlert: true }, () => {
        console.log("showEditAlert=", this.state.showEditAlert);
      });
      setTimeout(() => {
        this.setState({ showEditAlert: false });
      }, 3000);
    } else if (
      this.props.location.state &&
      this.props.location.state.showLoginAlert
    ) {
      this.setState(
        {
          showLoginAlert: true,
        },
        () => {
          console.log("showLoginAlert=", this.state.showLoginAlert);
        }
      );
      setTimeout(() => {
        this.setState({ showLoginAlert: false });
      }, 3000);
    }
  }

  render() {
    return (
      <>
        <div className="banner h-screen flex justify-center items-center">
          <div className="profile text-center mt-8 font-bold">
            <div className="avatar">
              <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src={this.state.profilePicture} alt="logo" />
              </div>
            </div>
            <h1>{this.state.fullName}</h1>
          </div>
        </div>
        <div className="divider"></div>

        <div className="details">
          <div className="details-top">
            <h1>Account Details</h1>
            <div className="right-side">
              <div className="edit-button">
                <button
                  className="btn"
                  onClick={(event) => this.EditProfileNavigate(event)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <br />
          <div>
            <h2>Organisation Name</h2>
            <p>{this.state.fullName}</p>
          </div>
          <div>
            <h2>Email Address</h2>
            <p>{this.state.email}</p>
          </div>
          <div>
            <h2>Website</h2>
            <p>{this.state.website}</p>
          </div>
          <div>
            <h2>Description</h2>
            <p>{this.state.description}</p>
          </div>
          <div>
            <h2>Contact No.</h2>
            <p>{this.state.contactNo}</p>
          </div>
          <div>
            <h2>Password</h2>
            <Link to="/change-password">
              <button className="btn">Change password</button>
            </Link>
          </div>
          <div>
            <h2>Theme</h2>
            <ToggleThemeComponent></ToggleThemeComponent>
          </div>
        </div>
        <div className="fixed bottom-4 right-4 z-50">
          <AlertComponent
            showAlert={this.state.showEditAlert}
            alertType="success"
            alertMessage="Profile edited successfully!"
          />
        </div>
        <div className="fixed bottom-4 right-4 z-50">
          <AlertComponent
            showAlert={this.state.showLoginAlert}
            alertType="info"
            alertMessage={`Welcome back, ${this.state.fullName}!`}
          />
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(OrganisationProfileComponent);
