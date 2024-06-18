import React, { Component } from "react";
import OppService from "../services/OppService";
import withNavigateandLocation from "./withNavigateandLocation";

class PostedEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

    editOpp = (event) => {
        event.preventDefault();
        this.props.navigate("/edit-event");
    }

    fetchData = async () => {
      const res = await OppService.getAllOpps();
      console.log(JSON.stringify(res.data));
      console.log(res.data + typeof res.data);
      this.setState( {items : res.data.events});
    }

    componentDidMount() {
        this.fetchData();
    }

  render() {

    let items = this.state.items;
    items.forEach((item) => {localStorage.setItem(item.id, item.id);});

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
          <p>These are the volunteer opportunities you have posted.</p>
          <br/>

          <div>
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
                    <button className="btn btn-primary" onClick={this.editOpp}>Edit</button> 
                    <button className="btn btn-primary" onClick={this.editOpp}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
    );
  }
}

export default withNavigateandLocation(PostedEvent);
