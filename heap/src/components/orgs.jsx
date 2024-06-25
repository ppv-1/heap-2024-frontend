import React, { Component } from "react";
import "./css/Organisations.css";
import withNavigateandLocation from "./withNavigateandLocation";
import OrgService from "../services/OrgService";

class OrganisationsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }
  fetchData = async () => {
    const res = await OrgService.getAllOrgs();
    // if (res.data.code !== 200) {
    //   this.props.navigate("/login");
    //   window.location.reload()
    // }
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    console.log(res.data.orgs);
    this.setState({ items: res.data.orgs });
  }
  async componentDidMount() {
    await this.fetchData();
  }

  organisationSubmit = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/organisations/${id}`);
}

  render() {
    let items = this.state.items;
    return (
        <div className="wrapper">
          <h1 className="title">Organisations</h1>
          <p>Here you can find information about different organisations.</p>
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
                      {/*<h1>{item.id}</h1>*/}
                      <p>Organisation</p>
                      <button
                          className="btn btn-primary"
                          onClick={(event) => this.organisationSubmit(event, item.email)}
                      >
                        More info
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        </div>
    );
  }
}

export default withNavigateandLocation(OrganisationsComponent);

