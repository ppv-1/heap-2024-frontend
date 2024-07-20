import React, { Component } from "react";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Create.css";
import OppService from "../services/OppService";
import MediaService from "../services/MediaService";
import { MultiSelect } from "react-multi-select-component";
import validator from "validator";

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

const MAX_FILES = 5;

const getTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }

  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return systemPrefersDark ? 'dim' : 'light';
};

class CreateOppComponent extends Component {
  constructor(props) {
    super(props);

    let theme = getTheme();

    console.log("state theme=" + theme);

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
      eventMedia: [],
      eventCoverMedia: null,
      errorMessage1: "",
      errorMessage2: "",
      errorMessage3: "",
      errorMessage4: "",
      theme: theme,
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDateHandler = this.changeDateHandler.bind(this);
    this.changeStartTimeHandler = this.changeStartTimeHandler.bind(this);
    this.changeEndTimeHandler = this.changeEndTimeHandler.bind(this);
    this.changeCausesHandler = this.changeCausesHandler.bind(this);
    this.changeLocationHandler = this.changeLocationHandler.bind(this);
    this.changeManpowerCountHandler =
      this.changeManpowerCountHandler.bind(this);
    this.changeSkillsHandler = this.changeSkillsHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changeCoverImageHandler = this.changeCoverImageHandler.bind(this);
    this.changeGalleryImagesHandler =
      this.changeGalleryImagesHandler.bind(this);
    this.createOpp = this.createOpp.bind(this);
  }

  createOpp = async (event) => {
    event.preventDefault();
    const { state } = this.props.location;
    console.log(state);
    const formData = new FormData();
    formData.append(`eventPhotos`, this.state.eventCoverMedia);
    this.state.eventMedia.forEach((file, index) => {
      formData.append(`eventPhotos`, file);
    });
    console.log("length of event media");
    console.log(this.state.eventMedia.length);
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
      await MediaService.uploadEventPhotos(res.data.id, formData).then(
        (res) => {
          this.props.navigate("/posted-event", {
            state: { showCreateAlert: true, itemName: opp.name },
          });
          console.log(res.status);
        }
      );
      // clear form fields?
      this.setState({
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
        eventMedia: [],
        eventCoverMedia: null,
      });
    } catch (error) {
      console.error("failed to create event", error);
    }
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeDateHandler = (event) => {
    // this.setState({ date: event.target.value });
    const date = event.target.value;
    this.setState({ date }, () => {
      this.validateDate(date);
    });
  };

  validateDate = (date = null) => {
    if (validator.isAfter(date)) {
      this.setState({ errorMessage1: "" });
    } else {
      this.setState({
        errorMessage1: "Please choose a future date. This date is invalid.",
      });
    }
  };

  changeStartTimeHandler = (event) => {
    // this.setState({ startTime: event.target.value });
    const startTime = event.target.value;
    this.setState({ startTime }, () => {
      this.validateStartTime(startTime);
    });
  };

  validateStartTime = (startTime = null) => {
    if (startTime < "06:00" || startTime > "22:00") {
      this.setState({
        errorMessage2: "Please select a time between 6am and 10pm.",
      });
    } else if (this.state.endTime && startTime > this.state.endTime) {
      this.setState({
        errorMessage2: "Please select an start time before the end time.",
      });
    } else {
      this.setState({ errorMessage2: "" });
    }
  };

  changeEndTimeHandler = (event) => {
    // this.setState({ endTime: event.target.value });
    const endTime = event.target.value;
    this.setState({ endTime }, () => {
      this.validateEndTime(endTime);
    });
  };

  validateEndTime = (endTime = null) => {
    if (endTime < "06:00" || endTime > "22:00") {
      this.setState({
        errorMessage3: "Please select a time between 6am and 10pm.",
      });
    } else if (endTime < this.state.startTime) {
      this.setState({
        errorMessage3: "Please select an end time after the start time.",
      });
    } else {
      this.setState({ errorMessage3: "" });
    }
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
    this.setState({ eventCoverMedia: file });
  };

  changeGalleryImagesHandler = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > MAX_FILES) {
      this.setState({
        errorMessage4: `You can upload a maximum of ${MAX_FILES} files.`,
      });
      event.target.value = null;
      return;
    }

    this.setState({
      eventMedia: files,
    });
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
    const isDarkMode = this.state.theme === "dim";
    const multiSelectClassName = isDarkMode ? "dark" : "";
    console.log("isdarkmode=" + isDarkMode);
    console.log("multiSelectClassName=" + multiSelectClassName);

    const isComplete = this.isFormComplete();
    const { errorMessage1, errorMessage2, errorMessage3, errorMessage4 } =
      this.state;
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
            <span className="error-message">{errorMessage1}</span>
            <label>
              <p>Start Time</p>
              <input
                type="time"
                min="06:00"
                max="22:00"
                required
                value={this.state.startTime}
                onChange={this.changeStartTimeHandler}
              />
            </label>
            <span className="error-message">{errorMessage2}</span>
            <label>
              <p>End Time</p>
              <input
                type="time"
                min="06:00"
                max="22:00"
                required
                value={this.state.endTime}
                onChange={this.changeEndTimeHandler}
              />
            </label>
            <span className="error-message">{errorMessage3}</span>
            <label htmlFor="causes">
              <p>Causes</p>
              <MultiSelect
                options={causes}
                value={this.state.causes}
                onChange={this.changeCausesHandler}
                labelledBy="causes"
                hasSelectAll={false}
                className={multiSelectClassName}
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
                className={multiSelectClassName}
              />
            </label>
            <label>
              <p>Type</p>
              <select
                className={`select select-bordered w-full custom-select ${multiSelectClassName}`}
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
                className={`select select-bordered w-full custom-select ${multiSelectClassName}`}
                onChange={this.changeLocationHandler}
              >
                <option disabled selected>
                  Select location
                </option>
                <option value={"all"}>All</option>
                <option value={"online"}>Online</option>
                <option value={"on-site"}>On-site</option>
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
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={this.changeCoverImageHandler}
              />
            </label>
            <label>
              <p>Gallery (maximum of 5 images)</p>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                multiple
                accept="image/*"
                onChange={this.changeGalleryImagesHandler}
              />
            </label>
            <span className="error-message">{errorMessage4}</span>
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
