import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OppService from "../services/OppService";
import OrgService from "../services/OrgService";

class PostedEventDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunity: null,
      loading: true,
      orgName: null,
      participants: [],
      attendance: [],
      images: [],
      selectAll: false,
    };

    this.markAttendance = this.markAttendance.bind(this);
    this.submitAttendance = this.submitAttendance.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
  }

  fetchData = async () => {
    const { id } = this.props.params;

    try {
      const res = await OppService.getOpp(id);
      const org = await OrgService.getOrg(res.data.organisation_id);
      const participants = await OppService.getEventParticipants(id);

      console.log(res.status);
      console.log(res.data);
      console.log("participants =>" + participants.data);

      this.setState({
        opportunity: res.data,
        loading: false,
        orgName: org.data.fullName,
        participants: participants.data.vols,
        attendance: [],
        images: res.data.photosFilepaths,
      });
    } catch (error) {
      console.error("Failed to fetch opportunity", error);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  markAttendance(participant) {
    this.setState((prevState) => {
      const isAttending = prevState.attendance.some(
        (att) => att.email === participant.email
      );
      const newAttendance = isAttending
        ? prevState.attendance.filter((att) => att.email !== participant.email)
        : [...prevState.attendance, participant];

      return { attendance: newAttendance };
    });
  }

  toggleSelectAll() {
    this.setState((prevState) => {
      const newSelectAll = !prevState.selectAll;
      const newAttendance = newSelectAll ? [...prevState.participants] : [];

      return {
        selectAll: newSelectAll,
        attendance: newAttendance,
      };
    });
  }

  submitAttendance() {
    const { opportunity, attendance } = this.state;
    console.log("id => " + opportunity.id + "  attendance => " + attendance);
    OppService.setEventAttendance(opportunity.id, attendance);
  }

  render() {
    const {
      opportunity,
      loading,
      orgName,
      participants,
      attendance,
      images,
      selectAll,
    } = this.state;
    console.log(this.state);

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
                <a href="/posted-event">Posted Events</a>
              </li>
              <li>{opportunity.name}</li>
            </ul>
          </div>
        </div>
        <div className="details-container">
          {/* <div className="posted-content-container"> */}
          <div className="top">
            <h1 className="title">{opportunity.name}</h1>
          </div>
          <div className="left-container">
            <div className="left-details">
              <h1 className="title2">Organised by</h1>
              <p>{orgName}</p>
              <h1 className="title2">Description</h1>
              <p>{opportunity.description}</p>
            </div>
          </div>
          <div className="right-container">
            <div className="right-details">
              <h1 className="title2">Manpower needed</h1>
              <p>{opportunity.neededManpowerCount}</p>
              <h1 className="title2">Type</h1>
              <p>{opportunity.type}</p>
            </div>
          </div>

          <div className="data-table">
            <div className="overflow-x auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectAll}
                          onChange={this.toggleSelectAll}
                        />
                      </label>
                    </th>
                    <th>Volunteer</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((item) => (
                    <tr>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={attendance.some(
                              (att) => att.email === item.email
                            )}
                            onChange={() => this.markAttendance(item)}
                          />
                        </label>
                      </th>
                      <td>{item.fullName}</td>
                      <td className="attendance-button-col">
                        <button
                          className={`btn ${
                            attendance.some((att) => att.email === item.email)
                              ? "btn-success"
                              : "btn"
                          }`}
                          onClick={() => this.markAttendance(item)}
                        >
                          {attendance.some((att) => att.email === item.email)
                            ? "Attendance Marked"
                            : "Mark Attendance"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="btn btn-neutral" onClick={this.submitAttendance}>
            Submit Attendance
          </button>
          {/* <ul className="event-listings"> */}
          {/* {participants.map((item) => (
                  <div
                    key={item.id}
                    className="card card-compact w-30 bg-base-100 shadow-xl"
                  >
                    <div className="card-body">
                      <h2 className="card-title">{item.fullName}</h2>
                      <h1>{item.email}</h1>
                      <p>Volunteer</p>
                      <div className="card-actions justify-end">
                        <button
                          className={`btn ${
                            attendance.some((att) => att.email === item.email)
                              ? "btn-success"
                              : "btn"
                          }`}
                          onClick={() => this.markAttendance(item)}
                        >
                          {attendance.some((att) => att.email === item.email)
                            ? "Attendance Marked"
                            : "Mark Attendance"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))} */}

          {/* {images.map((url, index) => (
                  <div
                    key={index} // Ensure a unique key for each image
                    className="card card-compact w-30 bg-base-100 shadow-xl"
                  >
                    <figure>
                      {url ? (
                        <img src={url} alt={`Image ${index}`} />
                      ) : (
                        <p>No Image Available</p>
                      )}
                    </figure>
                    <div className="card-body">
                      <p>Image {index + 1}</p>
                    </div>
                  </div>
                ))} */}
          {/* </ul> */}
          {/* <div className="right-container">
            <div className="right-details">
              <div className="card w-150 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h1>Location</h1>
                  <p>{opportunity.location}</p>
                  <h1>Date and time</h1>
                  <p>Date: {opportunity.date}</p>
                  <p>Start: {opportunity.startTime}</p>
                  <p>End: {opportunity.endTime}</p>
                  <button
                    className="btn btn-neutral"
                    onClick={this.submitAttendance}
                  >
                    Submit Attendance
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>{" "}
      </div>
      // </div>
    );
  }
}

// Wrap Opportunity with withNavigateandLocation to pass params to class component
export default withNavigateandLocation((props) => (
  <PostedEventDetails {...props} params={useParams()} />
));
