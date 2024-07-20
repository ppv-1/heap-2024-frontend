import React, { Component, useState } from "react";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Create.css";
import OppService from "../services/OppService";
import ComplaintService from "../services/ComplaintService";
import MediaService from "../services/MediaService";

const MAX_FILES = 5;

class CreateComplaint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      complainee: "",
      description: "",
      complaintMedia:[],
      status: "pending",
    };

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeComplaineeHandler = this.changeComplaineeHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeComplaintMediaHandler = this.change
    this.createComplaint = this.createComplaint.bind(this);
  }

  createComplaint = async (event) => {
    event.preventDefault();
    const { state } = this.props.location;
    console.log(state);
    let complaint = {
      title: this.state.title,
      complainee: this.state.complainee,
      description: this.state.description,
      status: this.state.status,
    };
    console.log("complaint => " + JSON.stringify(complaint));
    const formData = new FormData();
    this.state.complaintMedia.forEach((file, index) => {
      formData.append(`complaintPhotos`, file);
    });
    try {
        const res = await ComplaintService.createComplaint(complaint);
        await MediaService.uploadComplaintPhotos(res.data.id, formData).then(
            (res) => {
              this.props.navigate("/", {
                state: { showCreateAlert: true, itemName: res.data.title},
              });
              console.log(res.status);
            }
        )
    }catch (error) {
        console.error("Failed to send complaint", error);
    }
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };

  changeComplaineeHandler = (event) => {
    this.setState({ email: event.target.value});
  }


  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeComplaintMediaHandler = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > MAX_FILES) {
      this.setState({
        errorMessage4: `You can upload a maximum of ${MAX_FILES} files.`,
      });
      event.target.value = null;
      return;
    }

    this.setState({
      complaintMedia: files,
    });
  };

  cancel = async (e) => {
    e.preventDefault();
    this.props.navigate("/");
  };

  render() {
    console.log(this.state);
    console.log(this.state.user);
    return (
      <>
        <div className="content">
          <div className="title">
            <h1>Create Complaint</h1>
          </div>
          <form>
            <label>
              <p>Title</p>
              <input
                  type="text"
                  required
                  value={this.state.title}
                  onChange={this.changeTitleHandler}
              />
            </label>
            <label>
              <p>Complainee (Optional)</p>
              <input
                  type="text"
                  required
                  value={this.state.title}
                  onChange={this.changeComplaineeHandler}
              />
            </label>
            <label>
              <p>Description</p>
              <textarea
                  required
                  value={this.state.description}
                  onChange={this.changeDescriptionHandler}
              />
            </label>
            <label>
              <p>Relevant Images (maximum of 5 images)</p>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                multiple
                accept="image/*"
                onChange={this.changeComplaintMediaHandler}
              />
            </label>
            <div className="button-container">
              <button className="btn btn-wide" onClick={this.createComplaint}>
                Create Complaint
              </button>
              <button className="btn" onClick={this.cancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(CreateComplaint);
