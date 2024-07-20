import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import RewardService from "../services/RewardService";
import QRCode from "qrcode.react";

class ManageRewardsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reward: null,
      loading: true,
      barcodes: [],
    };
  }

  fetchData = async () => {
    const { id } = this.props.params;
    console.log("id=" + id);

    try {
      const res = await RewardService.getReward(id);
      const barcodesRes = await RewardService.getRewardBarcodes(id);
      // console.log(res.status);
      // console.log(res.data);
      console.log("!!!!!!!!!!!");
      console.log(barcodesRes.status);
      console.log(barcodesRes.data);
      this.setState({
        reward: res.data,
        loading: false,
        barcodes: barcodesRes.data.rewards,
      });
    } catch (error) {
      console.error("Failed to fetch reward", error);
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    const { reward, loading, barcodes } = this.state;
    console.log(this.state);

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div className="wrapper">
          <div className="breadcrumbs-container">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/manage-rewards">Manage Rewards</a>
                </li>
                <li>{reward.name}</li>
              </ul>
            </div>
          </div>
        </div>
        <h1 className="title">{reward.name}</h1>
        <div className="info">
          <h2>Description: {reward.description}</h2>
          <h2>Reward ID: {reward.id}</h2>
          <h2>Type: {reward.type}</h2>
          <h2>Number of unredeemed barcodes: {reward.count}</h2>
        </div>
        <div className="data-table">
          <div className="overflow-x auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Reward</th>
                  <th>Barcode</th>
                  <th>Redemption status</th>
                  <th>Expiry Date</th>
                </tr>
                </thead>
                <tbody>
                {barcodes.map((barcode) => (
                  <tr key={barcode.reward_barcode_id}>
                    <td>{barcode.reward_barcode_id}</td>
                    <td>{barcode.barcode}</td>
                    <td>{barcode.redeemed ? "Redeemed" : "Unredeemed"}</td>
                    <td>{barcode.expiryDate}</td>
                  </tr>
                ))}
              </tbody>
              {/* <tfoot>
                <tr>
                <th>Reward</th>
                  <th>Barcode</th>
                  <th>Redemption status</th>
                  <th>Expiry Date</th>
                </tr>
              </tfoot> */}
            </table>
          </div>
        </div>
    );
  }
}

export default withNavigateandLocation((props) => (
    <ManageRewardsDetails {...props} params={useParams()}/>
));
