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
    };
  }

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

  render() {
    const { reward, loading } = this.state;
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
        <h1 className="title">{reward.name}</h1>
        <h2>Description: {reward.description}</h2>
        <div className="data-table">
          <div className="overflow-x auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Reward</th>
                  <th>Barcode</th>
                </tr>
              </thead>
              <tbody>
                <td>i</td>
                <td>2</td>
              </tbody>
              <tfoot>
                <tr>
                  <th>Reward</th>
                  <th>Barcode</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation((props) => (
  <ManageRewardsDetails {...props} params={useParams()} />
));
