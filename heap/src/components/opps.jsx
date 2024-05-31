import React, { Component } from "react";
import "./css/Opportunities.css"

class OpportunitiesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

    volunteerSubmit = (event) => {
        event.preventDefault();
        this.props.navigate("/");
    }

  render() {
    return (
        <div className="wrapper">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
            </ul>
          </div>
          <h1 className="title">Opportunities</h1>
          <p>Here you can find various opportunities.</p>
          <br/>
          <div className="card card-compact w-30 bg-base-100 shadow-xl">
            <figure>
              <img
                  src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
                  alt="SICS SMU"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">SICS</h2>
              <p>Volunteer opportunity</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={this.volunteerSubmit}>Volunteer Now</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default OpportunitiesComponent;

// const Opps = () => {
//   return (
//     <div>
//       <h1>Opportunities</h1>
//       <p>Here you can find various opportunities.</p>
//     </div>
//   );
// };

// export default Opps;
