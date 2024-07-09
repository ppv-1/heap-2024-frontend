import React, { Component } from "react";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Create.css";
import OppService from "../services/OppService";
import MediaService from "../services/MediaService";
import { MultiSelect } from "react-multi-select-component";

const causes = [
  { label: "Animal Welfare", value: "animalWelfare" },
  { label: "Arts", value: "arts" },
  { label: "Children", value: "children" },
  { label: "Community", value: "community" },
  { label: "Drug Awareness", value: "drugs" },
  { label: "Education", value: "education" },
  { label: "Eldercare", value: "elderly" },
  { label: "Environment and Water", value: "environment" },
  { label: "Families", value: "families" },
  { label: "Health", value: "health" },
  { label: "Heritage", value: "heritage" },
  { label: "Humanitarian", value: "humanitarian" },
  { label: "Mental Health", value: "mentalHealth" },
  { label: "Migrant Workers", value: "migrantWorkers" },
  { label: "Other", value: "other" },
  { label: "Rehabilitation & Reintegration", value: "rehabilitation" },
  { label: "Safety & Security", value: "safety" },
  { label: "Social Services", value: "socialServices" },
  { label: "Special Needs/Disabilities", value: "disabilities" },
  { label: "Sports", value: "sports" },
  { label: "Women & Girls", value: "women" },
  { label: "Youth", value: "youth" },

];

const skills = [
  { label: "Art & Craft", value: "art" },
  { label: "Befriending", value: "befriending" },
  { label: "Coaching & Mentoring", value: "coaching" },
  { label: "Counselling", value: "counselling" },
  { label: "Dialect-Speaking", value: "dialect" },
  { label: "Emcee skills", value: "emcee" },
  { label: "Entrepreneurship", value: "entrepreneurship" },
  { label: "Event Management", value: "eventManagement" },
  { label: "Facilitation", value: "facilitation" },
  { label: "First-aid", value: "firstAid" },
  { label: "Graphic Design", value: "GraphicDesign" },
  { label: "Language Translation", value: "translation" },
  { label: "Music", value: "music" },
  { label: "Photography", value: "photography" },
  { label: "Reading", value: "reading" },
  { label: "Sign Language", value: "signLanguage" },
  { label: "Social Media Execution", value: "socialMedia" },
  { label: "Software Development", value: "softwareDevelopment" },
  { label: "Sports", value: "sports" },
  { label: "Tutoring", value: "tutor" },
  { label: "Videography", value: "videography" },
  { label: "Web Design", value: "webDesign" },
  { label: "Others", value: "other" },

];

class CreateOppComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      date: "",
      startTime: "",
      endTime: "",
      causes: [],
      manpowerCount: "",
      skills: [],
      type: "",
      location: "",
      address: "",
      description: "",
      eventMedia: []
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeStartTimeHandler = this.changeStartTimeHandler.bind(this);
    this.changeEndTimeHandler = this.changeEndTimeHandler.bind(this);
    this.changeCausesHandler = this.changeCausesHandler.bind(this);
    this.changeLocationHandler = this.changeLocationHandler.bind(this);
    this.changeManpowerCountHandler = this.changeManpowerCountHandler.bind(this);
    this.changeSkillsHandler = this.changeSkillsHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changeCoverImageHandler = this.changeCoverImageHandler.bind(this);
    this.changeGalleryImagesHandler = this.changeGalleryImagesHandler.bind(this);
    this.createOpp = this.createOpp.bind(this);
  }

  createOpp = async (event) => {
    event.preventDefault();
    const { state } = this.props.location;
    console.log(state);
    const formData = new FormData();
    this.state.eventMedia.forEach((file, index) => {
      formData.append(`eventPhotos`, file);
    });
    let opp = {
      name: this.state.name,
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      causes: this.state.causes.map((cause) => cause.value),
      location: this.state.location,
      manpowerCount: this.state.manpowerCount,
      skills: this.state.skills.map((skill) => skill.value),
      description: this.state.description,
      type: this.state.type,
      address: this.state.address,
      // organisation: localStorage.getItem("token"),
    };
    console.log("opp => " + JSON.stringify(opp));
    try {
      const res = await OppService.createOpp(opp);
      console.log(res);
      console.log(formData);
      await MediaService.uploadEventPhotos(res.data.id, formData).then((res) => {
        this.props.navigate("/posted-event", {
          state: { showCreateAlert: true, itemName: opp.name },
        });
        console.log(res.status);
      });
    } catch(error){
      console.error("failed to create event", error);
    }
    
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeDateHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  changeStartTimeHandler = (event) => {
    this.setState({ startTime: event.target.value });
  };

  changeEndTimeHandler = (event) => {
    this.setState({ endTime: event.target.value });
  };

  changeCausesHandler = (selected) => {
    this.setState({ causes: selected });
  };

  changeLocationHandler = (event) => {
    this.setState({ location: event.target.value });
  };

  changeManpowerCountHandler = (event) => {
    this.setState({ manpowerCount: event.target.value });
  };

  changeSkillsHandler = (selected) => {
    this.setState({ skills: selected });
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };

  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };

  changeCoverImageHandler = (event) => {
    const file = event.target.files[0];
    this.setState(prevState => ({
      eventMedia: [file, ...prevState.eventMedia.filter((_, index) => index !== 0)]
    }));
  };

  changeGalleryImagesHandler = (event) => {
    const files = Array.from(event.target.files);
    this.setState(prevState => ({
      eventMedia: [prevState.eventMedia[0], ...files]
    }));
  };

  isFormComplete() {
    const {
      name,
      date,
      startTime,
      endTime,
      causes,
      manpowerCount,
      skills,
      type,
      location,
      address,
      description,
    } = this.state;

    return (
      name &&
      date &&
      startTime &&
      endTime &&
      causes.length > 0 &&
      manpowerCount &&
      skills.length > 0 &&
      location &&
      description
    );
  }

  render() {
    console.log(this.state);
    const isComplete = this.isFormComplete();
    return (
      <>
        <div className="content">
          <div className="title">
            <h1>Create Event</h1>
          </div>
          <form>
            <label>
              <p>Name</p>
              <input
                type="text"
                required
                value={this.state.name}
                onChange={this.changeNameHandler}
              />
            </label>
            <label>
              <p>Date</p>
              <input
                type="date"
                required
                value={this.state.date}
                onChange={this.changeDateHandler}
              />
            </label>
            <label>
              <p>Start Time</p>
              <input
                type="time"
                required
                value={this.state.startTime}
                onChange={this.changeStartTimeHandler}
              />
            </label>
            <label>
              <p>End Time</p>
              <input
                type="time"
                required
                value={this.state.endTime}
                onChange={this.changeEndTimeHandler}
              />
            </label>
            <label htmlFor="causes">
              <p>Causes</p>
              <MultiSelect
                options={causes}
                value={this.state.causes}
                onChange={this.changeCausesHandler}
                labelledBy="causes"
                hasSelectAll={false}
              />
            </label>
            <label>
              <p>Manpower Required</p>
              <input
                required
                type="number"
                value={this.state.manpowerCount}
                onChange={this.changeManpowerCountHandler}
              />
            </label>
            <label htmlFor="skills">
              <p>Relevant skills</p>
              <MultiSelect
                options={skills}
                value={this.state.skills}
                onChange={this.changeSkillsHandler}
                labelledBy="skills"
                hasSelectAll={false}
              />
            </label>
            <label>
              <p>Type</p>
              <select
                className="select select-bordered w-full"
                onChange={this.changeTypeHandler}
              >
                <option disabled selected>
                  Select type
                </option>
                <option value={"all"}>All</option>
                <option value={"ad-hoc"}>Ad-hoc</option>
                <option value={"short"}>Short-term (3-6 months)</option>
                <option value={"long"}>Long-term ({">"}6 months)</option>
              </select>
            </label>
            <label>
              <p>Location</p>
              <select
                className="select select-bordered w-full"
                onChange={this.changeLocationHandler}
              >
                <option disabled selected>
                  Select location
                </option>
                <option value={"online"}>Online</option>
                <option value={"on-site"}>On-site</option>
                <option value={"all"}>All of the above</option>
              </select>
            </label>
            <label>
              <p>Address</p>
              <input
                required
                type="text"
                value={this.state.address}
                onChange={this.changeAddressHandler}
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
              <p>Cover Image</p>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                accept="image/*"
                onChange={this.changeCoverImageHandler}
              />
            </label>
            <label>
              <p>Gallery</p>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                multiple
                accept="image/*"
                onChange={this.changeGalleryImagesHandler}
              />
            </label>
            <div className="button-container">
              <button
                className="btn btn-wide"
                onClick={this.createOpp}
                disabled={!isComplete}
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(CreateOppComponent);
