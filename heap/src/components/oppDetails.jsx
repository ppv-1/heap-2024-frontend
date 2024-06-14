import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { Link } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";

class Opportunity extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleButtonConfirm(){
    alert("You have successfully registered for this opportunity");
  }

  render() {
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
              <li>Opp</li>
            </ul>
          </div>
        </div>
        <div className="details-container">
          <div className="left-container">
            <div className="left-details">
              <h1 className="title">Opportunity Name + Organisation</h1>
              <br />
              <p>description</p>
              <p>hours</p>
              <p>manpower</p>
              <p>type</p>
            </div>
          </div>
          <div className="right-container">
            <div className="right-details">
              <h1 className="title">Location</h1>
              <p>address</p>
              <h1 className="title">Date and time</h1>
              <p>date and time</p>
              <p>start time</p>
              <p>end time</p>
              <div className="button-container">
              <Link to="/">
                <button className="btn btn-wide" onClick={this.handleButtonConfirm}>I want to volunteer</button>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Opportunity;
