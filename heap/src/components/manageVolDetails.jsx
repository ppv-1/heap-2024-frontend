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

    try {
      const res = await AdminService.getVolunteer(id);
      console.log(res.status);
      console.log(res.data);
      this.setState({ reward: res.data, loading: false });
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
                <a href="/manage-rewards">Manage Rewards</a>
              </li>
              <li>{volunteer.fullName}</li>
            </ul>
          </div>
        </div>
        <h1 className="title">{volunteer.fullName}</h1>
        <h2>.</h2>
        <div className="data-table">
          <div className="overflow-x auto">
            <table className="table">
              <thead>
                <tr>
                  <th>volunteer</th>
                  <th>volunteer</th>
                </tr>
              </thead>
              <tbody>
                <td>i</td>
                <td>2</td>
              </tbody>
              <tfoot>
                <tr>
                  <th>volunteer</th>
                  <th>volunteer</th>
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
  <ManageVolDetails {...props} params={useParams()} />
));