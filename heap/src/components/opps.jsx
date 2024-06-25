import React, { Component } from "react";
import "./css/Opportunities.css";
import OppService from "../services/OppService";
import withNavigateandLocation from "./withNavigateandLocation";

class OpportunitiesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  volunteerSubmit = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/opportunities/${id}`);
  }

  fetchData = async () => {
    const res = await OppService.getAllOpps();
    // if (res.data.code !== 200) {
    //   this.props.navigate("/login");
    //   window.location.reload()
    // }
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    console.log(res.data.events);
    this.setState({ items: res.data.events });
  }

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    let items = this.state.items;
    console.log(items);

    return (
      <div className="wrapper">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>

        <h1 className="title">Events</h1>
        <p>Here you can find various opportunities.</p>
        <br />

        <div>
          {items.map((item) => (
            <div key={item.id} className="card card-compact w-30 bg-base-100 shadow-xl">
              <figure>
                <img
                  src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
                  alt={item.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <h1>{item.id}</h1>
                <p>Volunteer opportunity</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={(event) => this.volunteerSubmit(event, item.id)}>Volunteer Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }
}

export default withNavigateandLocation(OpportunitiesComponent);
