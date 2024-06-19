import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OppService from "../services/OppService";

class Opportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunity: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const { id } = this.props.params;
    
    try {
      const res = await OppService.getOpp(id);
      console.log(res.status);
      console.log(res.data);
      this.setState({ opportunity: res.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch opportunity", error);
    }
  }

  handleButtonConfirm() {
    alert("You have successfully registered for this opportunity");
  }

  render() {
    const { opportunity, loading } = this.state;
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
              <h1 className="title">{opportunity.name} @ {opportunity.organization}</h1>
              <br />
              <p>{opportunity.description}</p>
              <p>{opportunity.hours}</p>
              <p>{opportunity.manpowerCount}</p>
              <p>{opportunity.type}</p>
            </div>
          </div>
          <div className="right-container">
            <div className="right-details">
              <h1 className="title">Location</h1>
              <p>{opportunity.location}</p>
              <h1 className="title">Date and time</h1>
              <p>{opportunity.date}</p>
              <p>{opportunity.startTime}</p>
              <p>{opportunity.endTime}</p>
              <div className="button-container">
                <button className="btn btn-wide" onClick={this.handleButtonConfirm}>
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
