import React, { Component } from "react";
import withNavigateandLocation from './withNavigateandLocation';
import "./css/Create.css";
import OrgService from "../services/OrgService";
import UserService from "../services/UserService";
import MediaService from "../services/MediaService";

class EditOrgProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      contactNo: "",
      website: "",
      description: "",
      location: "",
      profilePicture: null,
      fileErrorMessage: "", // State to store error message for file size
    };
    this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
    this.changeContactNoHandler = this.changeContactNoHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeWebsiteHandler = this.changeWebsiteHandler.bind(this);
    this.changeProfilePictureHandler = this.changeProfilePictureHandler.bind(this);
    this.changeLocationHandler = this.changeLocationHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
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
        location: res.data.location,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data.');
    }
  };

  async componentDidMount() {
    this.fetchData();
  }

  changeFullNameHandler = (event) => {
    this.setState({ fullName: event.target.value });
  };

  changeContactNoHandler = (event) => {
    this.setState({ contactNo: event.target.value });
  };

  changeWebsiteHandler = (event) => {
    this.setState({ website: event.target.value });
  };

  changeLocationHandler = (event) => {
    this.setState({ location: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
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
      location: this.state.location,
      website: this.state.website,
      description: this.state.description
    };
    const formData = new FormData();
    formData.append('pfp', this.state.profilePicture);
    console.log('profile => ' + JSON.stringify(profile));
    try {
      await MediaService.uploadPfp(formData);
      await OrgService.updateOrganisation(profile);
      this.props.navigate('/');
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="wrapper">
          <h1 className="title">Edit Profile</h1>
          <form encType="multipart/form-data">
            <label>
              <p>Name</p>
              <input type="text" required value={this.state.fullName} onChange={this.changeFullNameHandler} />
            </label>
            <label>
              <p>Contact No</p>
              <input type="number" required value={this.state.contactNo} onChange={this.changeContactNoHandler} />
            </label>
            <label>
              <p>Email</p>
              <input type="text" required value={this.state.email} onChange={this.changeEmailHandler} />
            </label>
            <label>
              <p>Location</p>
              <input type="text" required value={this.state.location} onChange={this.changeLocationHandler} />
            </label>
            <label>
              <p>Website</p>
              <input type="text" required value={this.state.website} onChange={this.changeWebsiteHandler} />
            </label>
            <label>
              <p>Description</p>
              <input type="text" required value={this.state.description} onChange={this.changeDescriptionHandler} />
            </label>
            <label>
              <p>Profile Picture</p>
              <input required type="file" accept="image/*" onChange={this.changeProfilePictureHandler} />
              {this.state.fileErrorMessage && (
                <div className="error-message">{this.state.fileErrorMessage}</div>
              )}
            </label>
            <div className="button-container">
              <button className="btn btn-wide" onClick={this.editProfile}>Save</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(EditOrgProfile);
