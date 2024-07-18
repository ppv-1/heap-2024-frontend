import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OrgService from "../services/OrgService";

class OrgDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organisation: null,
      loading: true,
    };
  }

  fetchData = async () => {
    const { id } = this.props.params;

    try {
      const res = await OrgService.getOrg(id);
      console.log(res.status);
      console.log(res.data);
      this.setState({ organisation: res.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch organisation", error);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    const { organisation, loading } = this.state;
    console.log(this.state);

    if (loading) {
      return (
        <div className="wrapper">
          <h1>Loading...</h1>
        </div>
      );
    }

    if (!organisation) {
      return (
        <div className="wrapper">
          <h1>Organisation not found.</h1>
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
                <a href="/organisations">Organisations</a>
              </li>
              <li>{organisation.fullName}</li>
            </ul>
          </div>
        </div>

        <div className="details-container">
          <div className="top">
            <h1 className="title">{organisation.fullName}</h1>
            <a href={organisation.website}>{organisation.website}</a>
          </div>
          <div className="content-container">
            <div className="left-container">
              <div className="left-details">
                <h1 className="title">Description</h1>
                <p>{organisation.description}</p>
                <h1 className="title">Location</h1>
                <p>{organisation.location}</p>
              </div>
            </div>
            <div className="right-container">
              <div className="right-details">
                <h1 className="title">Contact Number</h1>
                <p>{organisation.contactNo}</p>
                <h1 className="title">Email</h1>
                <p>{organisation.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Wrap OrgDetails with withNavigateandLocation to pass params to class component
export default withNavigateandLocation((props) => (
  <OrgDetails {...props} params={useParams()} />
));
