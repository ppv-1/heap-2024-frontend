import React, { Component } from "react";
import "./css/Profile.css";
import withNavigateandLocation from "./withNavigateandLocation";
import { Link, useLocation } from "react-router-dom";
import UserService from "../services/UserService";
import { api } from "../services/UserService";
import ToggleThemeComponent from "./toggleTheme.jsx";
import MediaService from "../services/MediaService";

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      fullName: "",
      contactNo: "",
      email: "",
      gender: "",
      profilePicture: null
    };

   
  }

  fetchData = async () => {
    try {
      const res = await UserService.getProfile();
      const base64Image = await MediaService.getPfp();

      console.log(base64Image.data);
      const dataUrl = `data:image/jpeg;base64,${base64Image.data}`;
      console.log(dataUrl);

      this.setState({
        fullName: res.data.fullName,
        contactNo: res.data.contactNo,
        email: res.data.email,
        gender: res.data.gender,
        profilePicture: dataUrl
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data.');
    }
  };

  changePasswordHandler = (event) => {
    event.preventDefault();
    this.props.navigate("/change-password");
  };

  EditProfileNavigate = (event) => {
    event.preventDefault();
    this.props.navigate(`/edit-profile`);
  };

  componentDidMount() {
    this.fetchData();
  }
  

  render() {

    return (
      <>
        <div className="banner h-screen flex justify-center items-center">
          <div className="profile text-center mt-8 font-bold">
            <div className="avatar">
              <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src={this.state.profilePicture} alt="avatar" />
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
            <h2>Name</h2>
            <p>{this.state.fullName}</p>
          </div>
          <div>
            <h2>Phone Number</h2>
            <p>{this.state.contactNo}</p>
          </div>
          <div>
            <h2>Gender</h2>
            <p>{this.state.gender}</p>
          </div>
          <div>
            <h2>Email Address</h2>
            <p>{this.state.email}</p>
          </div>
          <div>
            <h2>Password</h2>
            <div className="change-password-container">
              <Link to="/change-password">
                <button className="btn">Change password</button>
              </Link>
            </div>
          </div>
          <div>
            <h2>Theme</h2>
            <ToggleThemeComponent></ToggleThemeComponent>
          </div>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(UserProfileComponent);
