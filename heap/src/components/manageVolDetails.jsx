import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import AdminService from "../services/AdminService";

class ManageVolDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volunteer: null,
      loading: true,
    };
  }

  fetchData = async () => {
    const { id } = this.props.params;
    console.log(id);

    try {
      const res = await AdminService.getVolunteer(id);
      console.log(res.status);
      console.log("!!!!!!!!!!!!!!!!");
      console.log(res);
      this.setState({ volunteer: res.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch volunteer", error);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    const { volunteer, loading } = this.state;
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
                <a href="/manage-vols">Manage Volunteers</a>
              </li>
              <li>{volunteer.fullName}</li>
            </ul>
          </div>
        </div>
        <h1 className="title">{volunteer.fullName}</h1>
        <div className="avatar">
              <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src={volunteer.pfp_filepath} alt="avatar" />
              </div>
            </div>
        <div className="data-table">
          <div className="overflow-x auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <td>{volunteer.contactNo}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.gender}</td>
                <td>{volunteer.points}</td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation((props) => (
  <ManageVolDetails {...props} params={useParams()} />
));