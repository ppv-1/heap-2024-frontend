import React, { Component } from "react";
import "./css/Organisations.css";
import withNavigateandLocation from "./withNavigateandLocation";
import OrgService from "../services/OrgService";
import AdminService from "../services/AdminService";

class ManageOrgs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }
  fetchData = async () => {
    const res = await OrgService.getAllOrgs();
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    console.log(res.data.orgs);
    this.setState({ items: res.data.orgs });
  };
  async componentDidMount() {
    await this.fetchData();
  }

  verifyOrgHandler = async (event, id) => {
    event.preventDefault();
    let result = window.confirm(
      "Are you sure you want to verify organisation " + id + "?"
    );
    if (result) {
      await AdminService.verifyOrg(id);
      window.location.reload();
      alert("Organisation " + id + " verified");
    }
  };

  blacklistOrgHandler = async (event, id) => {
    event.preventDefault();
    let result = window.confirm(
      "Are you sure you want to blacklist organisation " + id + "?"
    );

    if (result) {
      await AdminService.blacklistUser(id);
      // Assuming AdminService.blacklistUser(id) toggles the blacklist status

      // After the operation completes, update the state or modify the item directly
      let updatedItems = this.state.items.map((item) => {
        if (item.email === id) {
          // Toggle the state of the item's blacklist status
          item.locked = !item.locked;
        }
        return item;
      });

      // Update the state with the modified items array
      this.setState({ items: updatedItems });
      let item = updatedItems.find((item) => item.email === id);

      alert(
        "Organisation " + id + (item.locked ? " blacklisted" : " unblacklisted")
      );
    }
  };

  whitelistOrgHandler = async (event, id) => {
    event.preventDefault();
    let result = window.confirm(
      "Are you sure you want to whitelist organisation " + id + "?"
    );

    if (result) {
      await AdminService.whitelistUser(id);

      // After the operation completes, update the state or modify the item directly
      let updatedItems = this.state.items.map((item) => {
        if (item.email === id) {
          // Toggle the state of the item's blacklist status
          item.locked = !item.locked;
        }
        return item;
      });

      // Update the state with the modified items array
      this.setState({ items: updatedItems });
      let item = updatedItems.find((item) => item.email === id);

      alert(
        "Organisation " + id + (item.locked ? " blacklisted" : " whitelisted")
      );
    }
  };

  deleteOrgHandler = async (event, id) => {
    event.preventDefault();
    let result = window.confirm(
      "Are you sure you want to delete organisation " + id + "?"
    );
    if (result) {
      await AdminService.deleteUser(id);
      window.location.reload();
      alert("Organisation " + id + " deleted");
    }
  };

  render() {
    let items = this.state.items;
    return (
      <div className="wrapper">
        <h1 className="title">Manage Organisations</h1>
        <br />
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="card card-compact w-30 bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
                  alt={item.fullName}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.fullName}</h2>
                <p>Organisation</p>
                <button
                  className="btn btn-primary"
                  onClick={(event) => this.verifyOrgHandler(event, item.email)}
                >
                  Verify
                </button>
                {item.locked ? (
                  <button
                    className="btn btn-primary"
                    onClick={(event) =>
                      this.whitelistOrgHandler(event, item.email)
                    }
                  >
                    Whitelist
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={(event) =>
                      this.blacklistOrgHandler(event, item.email)
                    }
                  >
                    Blacklist
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={(event) => this.deleteOrgHandler(event, item.email)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation(ManageOrgs);
