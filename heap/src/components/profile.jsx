import React, { Component } from "react";
import "./css/Profile.css";
import withNavigateandLocation from "./withNavigateandLocation";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import ToggleThemeComponent from "./toggleTheme.jsx";
import MediaService from "../services/MediaService";
import AlertComponent from "./alert.jsx";

class UserProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      contactNo: "",
      email: "",
      gender: "",
      points: "",
      profilePicture: null,
      showEditAlert: false,
      showLoginAlert: false,
    };

    this.fetchData = this.fetchData.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.EditProfileNavigate = this.EditProfileNavigate.bind(this);

    // UserService.getProfile().then((res) => {
    // // api.get("/profile").then((res) => {
    //   console.log(res.data)
    //   this.setState({fullName: res.data.fullName,
    //     contactNo: res.data.contactNo,
    //     email: res.data.email,
    //     gender: res.data.gender});
    //   // if (res.data.code === 200) {
    //   //   this.setState({fullName: res.data.fullName,
    //   //     contactNo: res.data.contactNo,
    //   //     email: res.data.email,
    //   //     gender: res.data.gender});
    //   // } else {
    //   //   localStorage.removeItem("token");
    //   //   this.props.navigate("/login");
    //   // }
    //
    // });
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
        points: res.data.points,
        profilePicture: dataUrl,
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
    this.props.navigate(`/edit-profile`);
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
    const gender = this.state.gender;
    if (gender === "M") {
      let genderFull = "Male";
    } else if (gender === "F") {
      let genderFull = "Female";
    } else if (gender === "N") {
      let genderFull = "Non-binary";
    } else {
      let genderFull = "None";
    }

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
            <h1>Profile Details</h1>
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
            <h2>Points Remaining</h2>
            <p>{this.state.points}</p>
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

        <AlertComponent
          showAlert={this.state.showEditAlert}
          alertType="success"
          alertMessage="Profile edited successfully!"
        />

        <AlertComponent
          showAlert={this.state.showLoginAlert}
          alertType="info"
          alertMessage={`Welcome back, ${this.state.fullName}!`}
        />
      </>
    );
  }
}

export default withNavigateandLocation(UserProfileComponent);
