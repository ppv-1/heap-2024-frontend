import React, { Component } from "react";
import OppService from "../services/OppService";
import withNavigateandLocation from "./withNavigateandLocation";
import UserService from "../services/UserService";
import "./css/Opportunities.css";
import OrgService from "../services/OrgService";
import AlertComponent from "./alert";
import Pagination from "./pagination";

class PostedEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      showCreateAlert: false,
      itemName: "",
      showEditAlert: false,
      showDeleteAlert: false,
      currentPage: 1,
      postsPerPage: 10, 
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

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    let {items, currentPage, postsPerPage } = this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className="wrapper">
        {/* <div className="breadcrumbs-container">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
            </ul>
          </div>
        </div> */}
        <h1 className="title">Posted Events</h1>
        <p>These are the volunteer opportunities you have posted.</p>
        <br />

        <div className="posted-event-listings">
          {currentItems.map((item) => (
            <div className="card card-compact w-30 bg-base-100 shadow-xl">
              <figure>
                <img src={item.photosFilepaths[0]} alt={item.name}/>
              </figure>
              <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
                <div className="card-actions justify-end">
                  <button
                    className="btn"
                    onClick={(event) => this.detailsOpp(event, item.id)}
                  >
                    Details
                  </button>
                  <button
                    className="btn"
                    onClick={(event) => this.editOpp(event, item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={(event) => this.deleteOpp(event, item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-4 right-4 z-50">
          <AlertComponent
            showAlert={this.state.showCreateAlert}
            alertType="success"
            alertMessage={`${this.state.itemName} created successfully.`}
          />
        </div>

        <div className="fixed bottom-4 right-4 z-50">
          <AlertComponent
            showAlert={this.state.showEditAlert}
            alertType="success"
            alertMessage={`${this.state.itemName} edited successfully.`}
          />
        </div>

        <div className="fixed bottom-4 right-4 z-50">
          <AlertComponent
            showAlert={this.state.showDeleteAlert}
            type="success"
            message={`${this.state.itemName} deleted successfully.`}
          />
        </div>
        <Pagination
          postsPerPage={this.state.postsPerPage}
          length={items.length}
          paginate={this.handlePageChange}
        />
      </div>
    );
  }
}

export default withNavigateandLocation(PostedEvent);
