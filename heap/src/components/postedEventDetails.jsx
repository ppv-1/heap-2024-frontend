import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OppService from "../services/OppService";
import OrgService from "../services/OrgService";
import MediaService from "../services/MediaService";

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
    };

    this.markAttendance = this.markAttendance.bind(this);
    this.submitAttendance = this.submitAttendance.bind(this);
  }

  fetchData = async () => {
    const { id } = this.props.params;

    try {
      const res = await OppService.getOpp(id);
      const org = await OrgService.getOrg(res.data.organisation);
      const participants = await OppService.getEventParticipants(id);
      
      console.log(res.status);
      console.log(res.data);
      console.log("participants =>" + participants.data);
     

      // Convert object values to an array of objects
      
      //   const imageURLs = imagePathsArray.map(photo => {
      //     if (photo.data) {
      //       const byteCharacters = atob(photo.data);
      //       const byteNumbers = new Array(byteCharacters.length);
      //       for (let i = 0; i < byteCharacters.length; i++) {
      //         byteNumbers[i] = byteCharacters.charCodeAt(i);
      //       }
      //       const byteArray = new Uint8Array(byteNumbers);
      //       const blob = new Blob([byteArray], { type: 'image/png' });
      //       return URL.createObjectURL(blob);
      //     }
      //     return null;
      //   });

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
        (att) => att.id === participant.id
      );
      const newAttendance = isAttending
        ? prevState.attendance.filter((att) => att.id !== participant.id)
        : [...prevState.attendance, participant];

      return { attendance: newAttendance };
    });
  }

  submitAttendance() {
    console.log(
      "id => " +
        this.state.opportunity.id +
        "  attendance => " +
        this.state.attendance
    );
    OppService.setEventAttendance(
      this.state.opportunity.id,
      this.state.attendance
    );
  }

  render() {
    const {
      opportunity,
      loading,
      orgName,
      participants,
      attendance,
      images,
    } = this.state;
    console.log(this.state);

    // console.log("!!!!!!!!!!");
    // console.log("images type = " + typeof this.state.images);
    // console.log("images content = ", this.state.images);
    // {
    //   images.map((image, index) => {
    //     console.log("!!!!!!!!!!");
    //     console.log("image=" + image.data);
    //     console.log("index=" + index);
    //   });
    // }

    console.log("!!!!!!!!!!");
    

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
              {opportunity.name} @ {orgName}
            </h1>

            <br />
            <div className="left-details">
              <p>Description: {opportunity.description}</p>
              <p>Manpower needed: {opportunity.neededManpowerCount}</p>
              <p>Type: {opportunity.type}</p>
              <ul className="event-listings">
                {participants.map((item) => (
                  <div
                    key={item.id}
                    className="card card-compact w-30 bg-base-100 shadow-xl"
                  >
                    <figure>
                      <img
                        src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
                        alt={item.name}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.fullName}</h2>
                      <h1>{item.id}</h1>
                      <p>Volunteer</p>
                      <div className="card-actions justify-end">
                        <button
                          className={`btn ${
                            attendance.some((att) => att.id === item.id)
                              ? "btn-success"
                              : "btn"
                          }`}
                          onClick={() => this.markAttendance(item)}
                        >
                          {attendance.some((att) => att.id === item.id)
                            ? "Attendance Marked"
                            : "Mark Attendance"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {images.map((url, index) => (
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
                ))}

                {/* {images.map((image, index) => {
                  return (
                    <div
                      key={index} // Ensure a unique key for each image
                      className="card card-compact w-30 bg-base-100 shadow-xl"
                    >
                      <figure>
                        {image.data ? (
                          <img
                            src={`data:image/png;base64,${image.data}`}
                            alt={`Image ${index}`}
                          />
                        ) : (
                          <p>No Image Available</p>
                        )}
                      </figure>
                      <div className="card-body">
                        <p>Image {index + 1}</p>
                      </div>
                    </div>
                  );
                })} */}
              </ul>
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
                  <button
                    className="btn btn-neutral"
                    onClick={this.submitAttendance}
                  >
                    Submit Attendance
                  </button>
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
  <PostedEventDetails {...props} params={useParams()} />
));
