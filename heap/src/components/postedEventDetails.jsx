import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OppService from "../services/OppService";
import OrgService from "../services/OrgService";
import Pagination from "./pagination";

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
      currentPage: 1,
      postsPerPage: 10,
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

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const {
      opportunity,
      loading,
      orgName,
      participants,
      attendance,
      images,
      selectAll,
      currentPage,
      postsPerPage
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

    // Get current participants
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentParticipants = participants.slice(indexOfFirstPost, indexOfLastPost);

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
          <button className="btn btn-neutral" onClick={this.submitAttendance}>
            Submit Attendance
          </button>

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
                  {currentParticipants.map((item) => (
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
              <Pagination
                  postsPerPage={postsPerPage}
                  length={participants.length}
                  paginate={this.handlePageChange}
              />
            </div>
          </div>
          

        </div>{" "}
      </div>
    );
  }
}

// Wrap Opportunity with withNavigateandLocation to pass params to class component
export default withNavigateandLocation((props) => (
  <PostedEventDetails {...props} params={useParams()} />
));
