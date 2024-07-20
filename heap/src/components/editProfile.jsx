import React, { Component } from "react";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Create.css";
import VolunteerService from "../services/VolunteerService";
import UserService from "../services/UserService";
import MediaService from "../services/MediaService";
import validator from "validator";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      contactNo: "",
      email: "",
      profilePicture: null,
      fileErrorMessage: "", // State to store error message for file size
      showEditAlert: false,
      errorMessage1: "",
      errorMessage2: "",
    };
    this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
    this.changeContactNoHandler = this.changeContactNoHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeProfilePictureHandler =
      this.changeProfilePictureHandler.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await UserService.getProfile();
      this.setState({
        fullName: res.data.fullName,
        contactNo: res.data.contactNo,
        email: res.data.email,
      });
    } catch (error) {
      console.error("failed to fetch user", error);
    }
  }

  changeFullNameHandler = (event) => {
    this.setState({ fullName: event.target.value });
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

  changeProfilePictureHandler = (event) => {
    const file = event.target.files[0];
    const maxSize = 1 * 1024 * 1024; // 1MB in bytes

    if (file.size > maxSize) {
      this.setState({ fileErrorMessage: "File size exceeds 1MB" });
    } else {
      this.setState({ profilePicture: file, fileErrorMessage: "" });
    }
  };

  editProfile = async (e) => {
    e.preventDefault();
    const { state } = this.props.location;
    console.log(state);
    let profile = {
      email: this.state.email,
      fullName: this.state.fullName,
      password: null,
      contactNo: this.state.contactNo,
      dob: null,
    };
    const formData = new FormData();
    formData.append("pfp", this.state.profilePicture);
    console.log("profile => " + JSON.stringify(profile));
    try {
      await MediaService.uploadPfp(formData);
      await VolunteerService.updateVolunteer(profile);
      this.props.navigate("/user-profile", { state: { showEditAlert: true } });
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  cancel = async (e) => {
    e.preventDefault();
    this.props.navigate("/user-profile");
  };

  render() {
    console.log(this.state);
    const { errorMessage1, errorMessage2 } = this.state;
    return (
      <>
        <div className="content">
          <h1 className="title">Edit Profile</h1>
          <form encType="multipart/form-data">
            <label>
              <p>Name</p>
              <input
                type="text"
                required
                value={this.state.fullName}
                onChange={this.changeFullNameHandler}
              />
            </label>
            <label>
              <p>Contact No</p>
              <input
                type="tel"
                required
                value={this.state.contactNo}
                onChange={this.changeContactNoHandler}
              />
            </label>
            <span className="error-message">{errorMessage1}</span>
            <label>
              <p>Email</p>
              <input
                type="text"
                required
                value={this.state.email}
                onChange={this.changeEmailHandler}
              />
            </label>
            <span className="error-message">{errorMessage2}</span>
            <label>
              <p>Profile Picture</p>
              <input
                required
                type="file"
                accept="image/*"
                onChange={this.changeProfilePictureHandler}
                className="file-input file-input-bordered w-full max-w-xs"
              />
              {this.state.fileErrorMessage && (
                <div className="error-message">
                  {this.state.fileErrorMessage}
                </div>
              )}
            </label>
            <div className="button-container">
              <button className="btn" onClick={this.editProfile}>
                Save
              </button>
              <button className="btn" onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(EditProfile);
