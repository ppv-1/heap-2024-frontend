import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import ComplaintService from "../services/ComplaintService";
import ManageComplaints from "./manageComplaints";

class ManageComplaintsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complaint: null,
      loading: true,
    };
  }

  fetchData = async () => {
    try {
      const { id } = this.props.params;
      const res = await ComplaintService.getComplaint(id);
      console.log(res.data);
      this.setState({ complaint: res.data, loading: false });
      console.log(res.data.complaint);
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    const { complaint, loading } = this.state;
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
                <a href="/manage-complaints">Manage Feedback</a>
              </li>
              <li>{complaint.id}</li>
            </ul>
          </div>
        </div>
        <h1 className="title">{complaint.title}</h1>
        <p>ID:{complaint.id}</p>
        <p>user ID:{complaint.userId}</p>
        <p>Desc:{complaint.description}</p>
      </div>
    );
  }
}

export default withNavigateandLocation((props) => (
  <ManageComplaintsDetails {...props} params={useParams()} />
));
