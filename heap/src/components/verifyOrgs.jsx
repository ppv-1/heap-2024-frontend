import React, { Component } from "react";
import "./css/Organisations.css";
import withNavigateandLocation from "./withNavigateandLocation";
import OrgService from "../services/OrgService";
import AdminService from "../services/AdminService";

class VerifyOrgs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }
  fetchData = async () => {
    const res = await OrgService.getAllOrgs();
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    console.log(res.data.orgs);
    this.setState({ items: res.data.orgs });
  }
  async componentDidMount() {
    await this.fetchData();
  }

  verifyOrgHandler = async (event, id) => {
    event.preventDefault();
    let result = window.confirm("Are you sure you want to verify organisation " +id  +"?");
      if (result){
        await AdminService.verifyOrg(id);
        window.location.reload();
        alert("Organisation " + id + " verified");
      }
}

  render() {
    let items = this.state.items;
    return (
        <div className="wrapper">
          <h1 className="title">Verify Organisations</h1>
          <p>Choose organisations to verify.</p>
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
                      <p>Organisation</p>
                      <button
                          className="btn btn-primary"
                          onClick={(event) => this.verifyOrgHandler(event, item.email)}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        </div>
    );
  }
}

export default withNavigateandLocation(VerifyOrgs);
