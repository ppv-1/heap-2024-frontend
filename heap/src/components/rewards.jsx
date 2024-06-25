import React, { Component } from "react";
import "./css/Organisations.css";
import withNavigateandLocation from "./withNavigateandLocation";
import OrgService from "../services/OrgService";
import RewardService from "../services/RewardService";

class Rewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }
  fetchData = async () => {
    
    const res = await RewardService.getAllRewards();
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    console.log(res.data.rewards);
    this.setState({ items: res.data.rewards });
  }
  async componentDidMount() {
    await this.fetchData();
  }

  rewardSubmit = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/rewards/${id}`);
}

  render() {
    let items = this.state.items;
    return (
        <div className="wrapper">
          <h1 className="title">Rewards</h1>
          <p>Here you can find information about different rewards.</p>
          <br/>
            <div>
              {items.map((item) => (
                  <div key={item.id} className="card card-compact w-30 bg-base-100 shadow-xl">
                    <figure>
                      <img
                          src="https://cdn-icons-png.flaticon.com/512/1426/1426770.png"
                          alt={item.name}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>
                      <p>Reward</p>
                      <button
                          className="btn btn-primary"
                          onClick={(event) => this.rewardSubmit(event, item.id)}
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

export default withNavigateandLocation(Rewards);

