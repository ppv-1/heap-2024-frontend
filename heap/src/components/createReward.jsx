import React, { Component } from "react";
import withNavigateandLocation from "./withNavigateandLocation";
import "./css/Create.css";
import RewardService from "../services/RewardService";
import MediaService from "../services/MediaService";

class CreateReward extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      pointsNeeded: "",
      rewardMedia: null,
      type: "",
      description: "",
      count: "",
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changePointsNeededHandler = this.changePointsNeededHandler.bind(this);
    this.changeRewardMediaHandler = this.changeRewardMediaHandler.bind(this);
    this.changeTypeHandler = this.changeTypeHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeCountHandler = this.changeCountHandler.bind(this);
  }

  createReward = async (event) => {
    event.preventDefault();
    const { state } = this.props.location;
    const formData = new FormData();
    formData.append("reward-image", this.state.rewardMedia);
    let reward = {
      name: this.state.name,
      pointsNeeded: this.state.pointsNeeded,
      type: this.state.type,
      description: this.state.description,
      count: this.state.count,
    };

    console.log("reward => " + JSON.stringify(reward));
    const res = await RewardService.createReward(reward);
    console.log(res.data);
    await MediaService.uploadRewardPhoto(res.data.id, formData).then((res) => {
      console.log("helo");
      console.log(res);
      this.props.navigate("/manage-rewards", {
        state: { showCreateAlert: true, rewardName: this.state.name },
      });
    });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changePointsNeededHandler = (event) => {
    this.setState({ pointsNeeded: event.target.value });
  };

  changeRewardMediaHandler = (event) => {
    this.setState({ rewardMedia: event.target.files[0] });
  };

  changeTypeHandler = (event) => {
    this.setState({ type: event.target.value });
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  changeCountHandler = (event) => {
    this.setState({ count: event.target.value });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="content">
          <h1 className="title">Create Reward</h1>

          <form enctype="multipart/form-data">
            <label>
              <p>Name</p>
              <input
                type="text"
                required
                value={this.state.name}
                onChange={this.changeNameHandler}
              />
            </label>
            <label>
              <p>Points Needed</p>
              <input
                type="number"
                required
                value={this.state.pointsNeeded}
                onChange={this.changePointsNeededHandler}
              />
            </label>

            <label>
              <p>Reward Image</p>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={this.changeRewardMediaHandler}
              />
              {/* {this.state.fileErrorMessage && (
                <div className="error-message">{this.state.fileErrorMessage}</div>
              )} */}
            </label>
            <label>
              <p>Type</p>
              <input
                type="text"
                required
                value={this.state.type}
                onChange={this.changeTypeHandler}
              />
            </label>
            <label>
              <p>Description</p>
              <input
                required
                type="text"
                value={this.state.description}
                onChange={this.changeDescriptionHandler}
              />
            </label>
            <label>
              <p>Count</p>
              <input
                required
                type="number"
                value={this.state.count}
                onChange={this.changeCountHandler}
              />
            </label>

            <div className="button-container">
              <button className="btn btn-wide" onClick={this.createReward}>
                Create
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigateandLocation(CreateReward);
