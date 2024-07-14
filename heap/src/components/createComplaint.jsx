import React, { Component, useState } from "react";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Create.css";
import OppService from "../services/OppService";
import ComplaintService from "../services/ComplaintService";

class CreateComplaint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      status: "pending"
    };

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.createComplaint = this.createComplaint.bind(this);
  }

  createComplaint = async (event) => {
    event.preventDefault();
    const { state } = this.props.location;
    console.log(state);
    let complaint = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
    };
    console.log("complaint => " + JSON.stringify(complaint));
    try {
        await ComplaintService.createComplaint(complaint);
        alert("Your complaint has been sent to the admin.");
    }catch (error) {
        console.error("Failed to send complaint", error);
    }
  };

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };


  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
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
              <p>Description</p>
              <textarea
                required
                value={this.state.description}
                onChange={this.changeDescriptionHandler}
              />
            </label>
            {/* <label>
              <p>Relevant Image</p>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </label> */}
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
