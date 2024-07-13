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
        <div className="container">
          <p>Email: {organisation.email}</p>
          <p>Contact Number: {organisation.contactNo}</p>
          <p>Location: {organisation.location}</p>
          <p>Website: {organisation.website}</p>
          <p>Description: {organisation.description}</p>
          <p>Complaint Count: {organisation.complainCount}</p>
          <p>Profile Picture:</p>
        </div>
        <div className="data-table">
          <div className="overflow-x auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Events?</th>
                  <th>idk</th>
                </tr>
              </thead>
              <tbody>
                <td>i</td>
                <td>2</td>
              </tbody>
              <tfoot>
                <tr>
                  <th>Organisation</th>
                  <th>idk</th>
                </tr>
              </tfoot>
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
