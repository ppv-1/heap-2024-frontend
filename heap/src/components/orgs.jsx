import React, { Component } from "react";
import "./css/Organisations.css";
import withNavigateandLocation from "./withNavigateandLocation";

class OrganizationsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  organisationSubmit = (event) => {
    event.preventDefault();
    this.props.navigate("/");
}

  render() {
    return (
      <div className="wrapper">
        <h1 className="title">Organisations</h1>
        <p>Here you can find information about different organisations.</p>
        <br />
        <div className="card card-compact w-30 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
              alt="SICS SMU"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">SICS</h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={this.organisationSubmit}
              >
                More info
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation(OrganizationsComponent);

// const Orgs = () => {
//   return (
//     <div>
//       <h1>Organizations</h1>
//       <p>Here you can find information about different organizations.</p>
//     </div>
//   );
// };

// export default Orgs;
