import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OppService from "../services/OppService";
import UserService from "../services/UserService";
import VolunteerService from "../services/VolunteerService";
import OrgService from "../services/OrgService";

class Opportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunity: null,
      loading: true,
      orgName: null
    };

    this.registerEvent = this.registerEvent.bind(this);
  }

  fetchData = async () => {
    const { id } = this.props.params;

    try {
      const res = await OppService.getOpp(id);
      const org = await OrgService.getOrg(res.data.organization);
      console.log(res.status);
      console.log(res.data);
      this.setState({ opportunity: res.data, loading: false ,orgName: org.data.fullName});
    } catch (error) {
      console.error("Failed to fetch opportunity", error);
    }
  }

  async componentDidMount() {
    await this.fetchData();
  }

  registerEvent = async (event) =>{
    const eventId = this.props.params.id;
    console.log(eventId);
    const res = await UserService.getProfile();
    console.log(res.data);
    const userId = res.data.email;
    console.log(userId);
    // let userId = {userId: res.data.email};
    // console.log(userId);
    await VolunteerService.registerEvent(eventId, userId);
    alert("You have successfully registered for this event");
  }

  render() {
    const { opportunity, loading, orgName} = this.state;
    console.log(this.state);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!opportunity) {
      return <div>Opportunity not found</div>;
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
            <div className="left-details">
              <h1 className="title">{opportunity.name} @ {orgName}</h1>
              <br />
              <p>Description: {opportunity.description}</p>
              <p>Manpower needed: {opportunity.neededManpowerCount}</p>
              <p>Type: {opportunity.type}</p>
            </div>
          </div>
          <div className="right-container">
            <div className="right-details">
              <h1 className="title">Location</h1>
              <p>{opportunity.location}</p>
              <h1 className="title">Date and time</h1>
              <p>Date: {opportunity.date}</p>
              <p>Start: {opportunity.startTime}</p>
              <p>End: {opportunity.endTime}</p>
              <div className="button-container">
                <button className="btn btn-wide" onClick={this.registerEvent}>
                  I want to volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Wrap Opportunity with withNavigateandLocation to pass params to class component
export default withNavigateandLocation((props) => <Opportunity {...props} params={useParams()} />);
