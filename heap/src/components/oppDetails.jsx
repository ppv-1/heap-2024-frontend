import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OppService from "../services/OppService";
import OrgService from "../services/OrgService";
import MediaService from "../services/MediaService";
import VolunteerService from "../services/VolunteerService";

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
      const org = await OrgService.getOrg(res.data.organisation);
      this.setState({ loading: false });
      const imageRes = await MediaService.getEventPhotos(id);

      console.log("type imageRes=" + typeof imageRes.data);

      console.log("Image Data:", imageRes.data);

      // Convert object values to an array of objects
      const imagePathsArray = Object.keys(imageRes.data).map((key) => ({
        id: key, // Assuming each key in imageRes.data can be used as an identifier
        data: imageRes.data[key],
      }));

      console.log("type imagePathsArray=" + typeof imagePathsArray);

      this.setState({
        opportunity: res.data,
        loading: false,
        orgName: org.data.fullName,
        images: imagePathsArray, // Assuming imageRes.data is an array of base64 strings
      });
      console.log("!!!!!!!");
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
    console.log("eventName="+eventName);
    await VolunteerService.registerEvent(eventId);
    // alert("You have successfully registered for this event");
    this.props.navigate("/registered-event", { state: { showRegAlert: true, registeredEventName: eventName } });
    // sessionStorage.setItem(
    //   "showRegAlert",
    //   JSON.stringify({ show: true, eventName })
    // );
    // this.props.navigate("/registered-event");
  };

  render() {
    const { opportunity, loading, images } = this.state;
    console.log(this.state);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!");
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
          <div className="left-container">
            <h1 className="title">
              {opportunity.name} @ {this.state.orgName}
            </h1>

            <br />
            <div className="left-details">
              <p>Description: {opportunity.description}</p>
              <p>Manpower needed: {opportunity.neededManpowerCount}</p>
              <p>Type: {opportunity.type}</p>
              <div className="event-listings">
                <div>
                  <img
                    src={`data:image/jpeg;base64,${this.state.images[0].data}`}
                    alt="image"
                  />
                </div>
                {images.map((image, index) => (
                  <div
                    key={index} // Ensure a unique key for each image
                    className="card card-compact w-30 bg-base-100 shadow-xl"
                  >
                    <figure>
                      <img
                        src={`data:image/jpeg;base64,${image.data}`}
                        alt={`Image ${index}`}
                      />
                    </figure>
                    <div className="card-body">
                      <p>Image {index + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="right-details">
              <div className="card w-150 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h1>Location</h1>
                  <p>{opportunity.location}</p>
                  <h1>Date and time</h1>
                  <p>Date: {opportunity.date}</p>
                  <p>Start: {opportunity.startTime}</p>
                  <p>End: {opportunity.endTime}</p>
                  <div className="button-container">
                    <button
                      className="btn"
                      onClick={this.registerEvent}
                    >
                      I want to volunteer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Wrap Opportunity with withNavigateandLocation to pass params to class component
export default withNavigateandLocation((props) => (
  <Opportunity {...props} params={useParams()} />
));
