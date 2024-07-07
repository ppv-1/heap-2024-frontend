import React, { Component } from "react";
import withNavigateandLocation from "./withNavigateandLocation";
import VolunteerService from "../services/VolunteerService";
import "./css/Opportunities.css";

class RegisteredEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

    unregisterSubmit = async (event, id) => {
        event.preventDefault();
        let result = window.confirm("Are you sure you want to unregister from this event?");
        console.log(id);
        if (result){
          const event =await VolunteerService.unregisterEvent(id);
          window.location.reload();
          alert("Successfully unregistered");
        }
    }

    fetchData = async () => {
      const res = await VolunteerService.getRegisteredEvents();
      console.log(JSON.stringify(res.data));
      console.log(res.data + typeof res.data);
      this.setState( {items : res.data.events});
    }

    componentDidMount() {
        this.fetchData();
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


          <h1 className="title">Volunteer</h1>
          <p>These are the volunteer opportunities you are signed up for.</p>
          <br/>

          <div className="content-wrapper">
            {items.map((item) => (
              <div className="card card-compact w-30 bg-base-100 shadow-xl" style={{ filter: "drop-shadow(0px 0px 5px #555)", borderRadius: 10 }}>
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
                    <button className="btn btn-primary" onClick={(event) => this.unregisterSubmit(event, item.id)}>Unregister</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
  }
}

export default withNavigateandLocation(RegisteredEvent);
