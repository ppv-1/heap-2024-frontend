import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OppService from "../services/OppService";
import OrgService from "../services/OrgService";
import MediaService from "../services/MediaService";
import VolunteerService from "../services/VolunteerService";

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

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");
  const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

  // Convert 24-hour time to 12-hour format
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes} ${period}`;
}

class Opportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunity: null,
      loading: true,
      orgName: null,
      images: [],
    };

    this.registerEvent = this.registerEvent.bind(this);
  }

  fetchData = async () => {
    const { id } = this.props.params;

    try {
      const res = await OppService.getOpp(id);
      const org = await OrgService.getOrg(res.data.organisation_id);
      // const orgResponse = await OrgService.getOrg(res.data.organisation);
      // console.log("orgResponse =", orgResponse);
      console.log(org.data);
      this.setState({ loading: false });
      // const imageRes = await MediaService.getEventPhotos(id);
      console.log(res.data);

      this.setState({
        opportunity: res.data,
        loading: false,
        orgName: org.data.fullName,
        images: res.data.photosFilepaths, // Assuming imageRes.data is an array of base64 strings
      });
      console.log("!!!!!!!");
      console.log("this.state.org=" + this.state.orgName);
    } catch (error) {
      console.error("Failed to fetch opportunity", error);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  registerEvent = async (event) => {
    const eventId = this.props.params.id;
    const { opportunity } = this.state;
    const eventName = opportunity.name;
    console.log("eventName=" + eventName);
    await VolunteerService.registerEvent(eventId);
    // alert("You have successfully registered for this event");
    this.props.navigate("/registered-event", {
      state: { showRegAlert: true, registeredEventName: eventName },
    });
    // sessionStorage.setItem(
    //   "showRegAlert",
    //   JSON.stringify({ show: true, eventName })
    // );
    // this.props.navigate("/registered-event");
  };

  render() {
    const { opportunity, loading, images, orgName } = this.state;
    console.log(this.state);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("org=" + orgName);
    // images.forEach((image, index) => {
    //   console.log(`Image ${index} data:`, image.data);
    // });

    if (loading) {
      return (
        <div className="wrapper">
          <h1>Loading...</h1>
        </div>
      );
    }

    if (!opportunity) {
      return (
        <div className="wrapper">
          <h1>Opportunity not found.</h1>
        </div>
      );
    }

    const causesLabels = opportunity.causes.map(
      (causeValue) => causes.find((cause) => cause.value === causeValue)?.label
    );

    const skillsLabels = opportunity.skills.map(
      (skillValue) => skills.find((skill) => skill.value === skillValue)?.label
    );

    return (
      <div className="wrapper">
        <div className="breadcrumbs-container">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/opportunities">Volunteer</a>
              </li>
              <li>{opportunity.name}</li>
            </ul>
          </div>
        </div>

        <div className="details-container">
          <div className="top">
            <h1 className="title">{opportunity.name}</h1>
            <a href={`/organisations/${orgName}`}>{orgName}</a>
            <div className="carousel opp-carousel">
              {images.map((image, index) => (
                <div
                  key={index}
                  id={`slide${index + 1}`}
                  className="carousel-item opp-carousel-item"
                >
                  <img src={image} className="w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="content-container">
            <div className="left-container">
              <div className="left-details">
                <h1 className="title">Description</h1>
                <p>{opportunity.description}</p>
                <h1 className="title">Causes</h1>
                <ul>
                  {causesLabels.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
                <h1 className="title">Skills</h1>
                <ul>
                  {skillsLabels.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
                <br />
                <br />
              </div>
            </div>
            <div className="opp-right-container">
              <div className="opp-right-details">
                <h1 className="title">Location</h1>
                <p>{opportunity.location}</p>
                <h1 className="title">Date and time</h1>
                <p>
                  {new Date(opportunity.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>Start: {formatTime(opportunity.startTime)}</p>
                <p>End: {formatTime(opportunity.endTime)}</p>
                <div className="button-container">
                  <button className="btn" onClick={this.registerEvent}>
                    I want to volunteer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div className="wrapper">
      //   <div className="breadcrumbs-container">
      //     <div className="breadcrumbs text-sm">
      //       <ul>
      //         <li>
      //           <a href="/">Home</a>
      //         </li>
      //         <li>
      //           <a href="/opportunities">Volunteer</a>
      //         </li>
      //         <li>{opportunity.name}</li>
      //       </ul>
      //     </div>
      //   </div>

      //   <div className="details-container">
      //     <div className="left-container">
      //       <h1 className="title">
      //         {opportunity.name} @ {this.state.orgName}
      //       </h1>

      //       <div className="carousel rounded-box">
      //         {images.map((image, index) => (
      //           <div
      //             key={index}
      //             id={`slide${index + 1}`}
      //             className="carousel-item"
      //           >
      //             <img src={image} className="w-full" />
      //           </div>
      //         ))}
      //       </div>
      //       <br />
      //       <div className="left-details">
      //         <p>Description: {opportunity.description}</p>
      //         <p>Manpower needed: {opportunity.neededManpowerCount}</p>
      //         <p>Type: {opportunity.type}</p>
      //       </div>
      //     </div>
      //     <div className="right-container">
      //       <div className="right-details">
      //         <div className="card w-150 bg-base-100 shadow-xl">
      //           <div className="card-body">
      //             <h1>Location</h1>
      //             <p>{opportunity.location}</p>
      //             <h1>Date and time</h1>
      //             <p>Date: {opportunity.date}</p>
      //             <p>Start: {opportunity.startTime}</p>
      //             <p>End: {opportunity.endTime}</p>
      //             <div className="button-container">
      //               <button className="btn" onClick={this.registerEvent}>
      //                 I want to volunteer
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

// Wrap Opportunity with withNavigateandLocation to pass params to class component
export default withNavigateandLocation((props) => (
  <Opportunity {...props} params={useParams()} />
));
