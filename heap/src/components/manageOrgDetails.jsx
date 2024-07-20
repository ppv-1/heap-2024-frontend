import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OrgService from "../services/OrgService";

class ManageOrgDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organisation: null,
      loading: true,
      orgEvents: null,
    };
  }

  fetchData = async () => {
    const { id } = this.props.params;

    try {
      const res = await OrgService.getOrg(id);
      const events = await OrgService.getOrgEvents(id);
      console.log(res.status);
      console.log(res.data);
      console.log("events!!!!!!!!");
      console.log(events.data.events);
      this.setState({
        organisation: res.data,
        loading: false,
        orgEvents: events.data.events,
      });
    } catch (error) {
      console.error("Failed to fetch organisation", error);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    const { organisation, loading, orgEvents } = this.state;
    console.log(this.state);

    if (loading) {
      return <div>Loading...</div>;
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
                <a href="/manage-rewards">Manage Organisations</a>
              </li>
              <li>{organisation.fullName}</li>
            </ul>
          </div>
        </div>
        <h1 className="title">{organisation.fullName}</h1>
        <div className="org-details-container">
          <div className="left-container">
            <div className="info">
              <h2>Email: {organisation.email}</h2>
              <h2>Contact Number: {organisation.contactNo}</h2>
              <h2>Location: {organisation.location}</h2>
              <h2>Website: {organisation.website}</h2>
              <h2>Description: {organisation.description}</h2>
              <h2>Complaint Count: {organisation.complainCount}</h2>
            </div>
          </div>
          <div className="right-container">
            <div className="avatar">
              <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src={organisation.pfp_filepath} alt="avatar" />
              </div>
            </div>
          </div>
        </div>
        <div className="data-table">
          <div className="overflow-x auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
              {orgEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation((props) => (
  <ManageOrgDetails {...props} params={useParams()} />
));
