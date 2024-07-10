import React, { Component } from "react";
import OppService from "../services/OppService";
import withNavigateandLocation from "./withNavigateandLocation";
import UserService from "../services/UserService";
import "./css/Opportunities.css";
import OrgService from "../services/OrgService";
import AlertComponent from "./alert";

class PostedEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      showCreateAlert: false,
      itemName: "",
      showEditAlert: false,
      showDeleteAlert: false,
    };
  }

  detailsOpp = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/posted-event/${id}`);
  };

  editOpp = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/edit-event/${id}`);
  };

  deleteOpp = async (event, id) => {
    event.preventDefault();
    let result = window.confirm("Are you sure you want to delete this event?");
    if (result) {
      await OppService.deleteOpp(id);
      window.location.reload();
      alert("Event successfully deleted");
    }
  };

  fetchData = async () => {
    const user = await UserService.getProfile();
    console.log(user);
    console.log(user.data.email + typeof user.data.email);

    const res = await OrgService.getOrgEvents(user.data.email);
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    this.setState({ items: res.data.events });
  };

  async componentDidMount() {
    await this.fetchData();
    if (
      this.props.location.state &&
      this.props.location.state.showCreateAlert
    ) {
      this.setState(
        { showCreateAlert: true, itemName: this.props.location.state.itemName },
        () => {
          console.log("showAlert=", this.state.showCreateAlert);
        }
      );
      setTimeout(() => {
        this.setState({ showCreateAlert: false, itemName: "" });
      }, 3000);
    } else if (this.showEditAlert) {
      this.setState({ showEditAlert: true });
      setTimeout(() => {
        this.setState({ showEditAlert: false }, 3000);
      });
    }
  }

  render() {
    let items = this.state.items;

    return (
      <div className="wrapper">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>

        <h1 className="title">Posted Events</h1>
        <p>These are the volunteer opportunities you have posted.</p>
        <br />

        <div className="event-listings">
          {items.map((item) => (
            <div className="card card-compact w-30 bg-base-100 shadow-xl">
              <figure>
                <img
                  src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
                  alt={item.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>Volunteer opportunity</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={(event) => this.detailsOpp(event, item.id)}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(event) => this.editOpp(event, item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(event) => this.deleteOpp(event, item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AlertComponent
          showAlert={this.state.showCreateAlert}
          type="success"
          message={`${this.state.itemName} created successfully.`}
        />

        <AlertComponent
          showAlert={this.state.showEditAlert}
          type="success"
          message={`${this.state.itemName} edited successfully.`}
        />

<AlertComponent
          showAlert={this.state.showDeleteAlert}
          type="success"
          message={`${this.state.itemName} deleted successfully.`}
        />
      </div>
    );
  }
}

export default withNavigateandLocation(PostedEvent);
