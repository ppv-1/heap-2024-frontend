import React, { Component } from "react";
import "./css/Organisations.css";
import withNavigateandLocation from "./withNavigateandLocation";
import AdminService from "../services/AdminService";

class ManageVols extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }
  fetchData = async () => {
    const res = await AdminService.getAllVolunteers();
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    console.log(res.data.vols);
    this.setState({ items: res.data.vols });
  }
  async componentDidMount() {
    await this.fetchData();
  }

  

  blacklistVolHandler = async (event, id) => {
    event.preventDefault();
    let result = window.confirm("Are you sure you want to blacklist volunteer " +id  +"?");
      if (result){
        await AdminService.blacklistUser(id);
        window.location.reload();
        alert("Volunteer " + id + " blacklisted");
      }
  }

  deleteVolHandler = async (event, id) => {
    event.preventDefault();
    let result = window.confirm("Are you sure you want to delete volunteer " +id  +"?");
      if (result){
        await AdminService.deleteUser(id);
        window.location.reload();
        alert("Volunteer " + id + " deleted");
      }
  }

  render() {
    let items = this.state.items;
    return (
        <div className="wrapper">
          <h1 className="title">Manage Volunteers</h1>
          <br/>
            <div>
              {items.map((item) => (
                  <div key={item.id} className="card card-compact w-30 bg-base-100 shadow-xl"
                       style={{filter: "drop-shadow(0px 0px 5px #555)", borderRadius: 10}}>
                    <figure>
                      <img
                          src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
                          alt={item.fullName}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.fullName}</h2>
                      <p>Volunteer</p>
                      <button
                          className="btn btn-primary"
                          onClick={(event) => this.blacklistVolHandler(event, item.email)}
                      >
                        Blacklist
                      </button>
                      <button
                          className="btn btn-primary"
                          onClick={(event) => this.deleteVolHandler(event, item.email)}
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

export default withNavigateandLocation(ManageVols);

