import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import RewardService from "../services/RewardService";
import QRCode from "qrcode.react";
import UserService from "../services/UserService";
import AlertComponent from "./alert";

class RewardDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reward: null,
      loading: true,
      showFailAlert: false,
      showRedeemAlert: false,
      failAlertMessage: "",
      redeemAlertMessage: "",
    };
  }

  redeemReward = async (event, id) => {
    let points;
    try {
      const res = await UserService.getProfile();
      points = res.data.points;
      await RewardService.redeemReward(id);
      const updatedProfileRes = await UserService.getProfile();
      const updatedPoints = updatedProfileRes.data.points;
      // alert("Reward redeemed. You have " + points + " points remaining.");
      this.setState({
        showRedeemAlert: true,
        redeemAlertMessage: `Reward redeemed. You have ${updatedPoints} points remaining.`,
      });
      setTimeout(() => {
        this.setState({ showRedeemAlert: false });
      }, 3000);
    } catch (error) {
      console.error("failed to redeem reward", error);
      this.setState({
        showFailAlert: true,
        failAlertMessage: `${error.response.data}. You have ${points} points currently.`,
      });
      setTimeout(() => {
        this.setState({ showFailAlert: false });
      }, 3000);
      // alert(error.response.data + ". You have " + points + " currently.");
    }
  };

  fetchData = async () => {
    const { id } = this.props.params;

    try {
      const res = await RewardService.getReward(id);
      console.log(res.status);
      console.log(res.data);
      this.setState({ reward: res.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch reward", error);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  isRewardFullyRedeemed = () => {
    const { reward } = this.state;
    return reward && reward.count <= 0;
  };

  render() {
    const {
      reward,
      loading,
      showFailAlert,
      showRedeemAlert,
      failAlertMessage,
      redeemAlertMessage,
    } = this.state;
    console.log(this.state);

    if (loading) {
      return <div>Loading...</div>;
    }

    // if (!reward) {
    //   return <div>reward not found</div>;
    // redeemReward = async (event, id) => {
    //   let points;
    //   try {
    //     const res = await UserService.getProfile();
    //     points = res.data.points;
    //     await RewardService.redeemReward(id);
    //     alert("Reward redeemed. You have " + points + " points remaining.");
    //   } catch (error) {
    //     console.error("failed to redeem reward", error);
    //     alert(error.response.data + ". You have " + points + " currently.");
    //   }
    // };

    return (
      <div className="wrapper">
        <div className="breadcrumbs-container">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/rewards">Rewards</a>
              </li>
              <li>{reward.name}</li>
            </ul>
          </div>
        </div>
        <div className="details-container">
          <div className="left-container">
            <div className="left-details">
              <h1 className="title">{reward.name}</h1>
              <br />
              <p>Description: {reward.description}</p>
              <p>Barcode Serial No: {reward.barcodeSerialNo}</p>
              <QRCode value={reward.barcodeSerialNo} />
            </div>
          </div>
          <div className="right-container">
            <div className="right-details">
              <h1 className="title">Type</h1>
              <p>Type: {reward.type}</p>
              <h1 className="title">Points Needed</h1>
              <p>Points Needed: {reward.pointsNeeded}</p>

              <div className="button-container">
                <button
                  className="btn btn-wide"
                  onClick={(event) => this.redeemReward(event, reward.id)}
                  disabled={this.isRewardFullyRedeemed()}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>

        <AlertComponent
          showAlert={showFailAlert}
          alertType="error"
          alertMessage={failAlertMessage}
        />

        <AlertComponent
          showAlert={showRedeemAlert}
          alertType="success"
          alertMessage={redeemAlertMessage}
        />
      </div>
    );
  }
}

export default withNavigateandLocation((props) => (
  <RewardDetails {...props} params={useParams()} />
));
