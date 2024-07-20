import React, { Component } from "react";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Create.css";
import OppService from "../services/OppService";
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

class EditOpp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      date: "",
      startTime: "",
      endTime: "",
      causes: "",
      manpowerCount: "",
      skills: "",
      type: "",
      location: "",
      address: "",
      description: "",
      showEditAlert: false,
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
    this.editOpp = this.editOpp.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.params;

    try {
      const res = await OppService.getOpp(id);
      console.log(res.status);
      console.log(res.data);
      console.log(res.data.manpowerCount + typeof res.data.manpowerCount);
      this.setState({
        id: res.data.id,
        name: res.data.name,
        date: res.data.date,
        startTime: res.data.startTime,
        endTime: res.data.endTime,
        causes: res.data.causes,
        location: this.state.location,
        manpowerCount: this.state.manpowerCount,
        skills: this.state.skills,
        description: this.state.description,
        type: this.state.type,
        address: this.state.address,
      });
    } catch (error) {
      console.error("Failed to fetch opportunity", error);
    }
  }

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
    const causesString = selected.join(",");
    this.setState({ causes: causesString });
  };

  changeLocationHandler = (event) => {
    this.setState({ location: event.target.value });
  };

  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };

  changeManpowerCountHandler = (event) => {
    this.setState({ manpowerCount: event.target.value });
  };

  changeSkillsHandler = (selected) => {
    const skillsString = selected.join(",");
    this.setState({ skills: skillsString });
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };

  editOpp = (e) => {
    e.preventDefault();
    const { state } = this.props.location;
    console.log(state);
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
      organisation: localStorage.getItem("token"),
    };
    console.log("opp => " + JSON.stringify(opp));

    OppService.updateOpp(this.state.id, opp).then((res) => {
      this.props.navigate("/posted-event", { state: { showEditAlert: true, itemName: opp.name } });
      console.log(res.status);
    });
  };

  render() {
    // const { state } = this.props.location;
    console.log(this.state);
    console.log(this.state.user);
    return (
      <>
        <div className="content">
          <h1 className="title">Edit Event</h1>

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
                labelledBy="Select related causes"
                className="table"
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
                labelledBy="Select related skills"
                className="table"
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
                <option>Ad-hoc</option>
                <option>Short-term (3-6 months)</option>
                <option>Long-term ({">"}6 months)</option>
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
                <option>Online</option>
                <option>On-site</option>
                <option>All of the above</option>
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
              />
            </label>
            <label>
              <p>Gallery</p>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                multiple
              />
            </label>
            <div className="button-container">
              <button className="btn btn-wide" onClick={this.editOpp}>
                Save
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation((props) => (
  <EditOpp {...props} params={useParams()} />
));
