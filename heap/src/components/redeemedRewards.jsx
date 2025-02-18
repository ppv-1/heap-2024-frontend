import React, { Component } from "react";
import "./css/Opportunities.css";
import withNavigateandLocation from "./withNavigateandLocation";
import RewardService from "../services/RewardService";
import MediaService from "../services/MediaService";
import QRCode from "qrcode.react";
import AlertComponent from "./alert";

class RedeemedRewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      images: {}, // To store the images for each reward
      loading: true, // To manage the loading state
      modalVisible: false,
      selectedReward: null,
      showUsedAlert: false,
    };
  }

  fetchData = async () => {
    try {
      const res = await RewardService.getRedeemedRewards();
      console.log(JSON.stringify(res.data));
      console.log(res.data + typeof res.data);
      console.log(res.data.rewards);

      const rewards = res.data.rewards;
      rewards.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

      this.setState({ items: rewards });

      // Fetch images for each reward

      this.setState({ loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      // alert('An error occurred while fetching data.');
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  showModal = (selected) => {
    this.setState({ modalVisible: true, selectedReward: selected });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      selectedReward: null,
      showUsedAlert: true,
    });
    setTimeout(() => {
      this.setState({ showUsedAlert: false });
    }, 3000);
  };

  handleConfirm = async (e) => {
    e.preventDefault();
    this.closeModal();
  };

  redeemRewardHandler = async (event, id) => {
    event.preventDefault();
    const res = await RewardService.useRewardBarcode(id);
    let selected = this.state.items.find(
      (item) => item.reward_barcode_id === id
    );
    console.log(res.data);
    this.showModal(selected);
    this.setState({
      items: this.state.items.filter((item) => item.reward_barcode_id !== id),
    });
  };

  render() {
    const { items, images, loading, selectedReward, modalVisible } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while fetching data
    }

    return (
      <div className="wrapper">
        {/* <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div> */}
        <h1 className="title">Redeemed Rewards</h1>

        {items.length === 0 ? (
          <>
            <p>You have not redeemed any rewards.</p>
            <div className="instructions">
              <p>
                Here you can use the rewards you have redeemed.
                <br />
                Please be ready to show the QR Code in order to use the reward.
                <br />
                The reward will then be deleted.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="instructions">
              <p>
                Here you can use the rewards you have redeemed.
                <br />
                Please be ready to show the QR Code in order to use the reward.
                <br />
                The reward will then be deleted.
              </p>
            </div>
            <div className="event-listings">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="card card-compact w-30 bg-base-100 shadow-xl"
                >
                  <figure>
                    <img src={item.pfp_filepath} alt={item.name} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <div className="badge badge-accent">
                      Expiry Date: {item.expiryDate}
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={(event) =>
                        this.redeemRewardHandler(event, item.reward_barcode_id)
                      }
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {modalVisible && (
          <dialog className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box">
              <h3 className="font-bold text-lg">Use {selectedReward?.name}</h3>
              <QRCode value={selectedReward.barcodeSerialNo} />
              <p className="py-4">
                Please show this QR Code to use the reward.
              </p>
              <div className="modal-action">
                <button className="btn" onClick={this.handleConfirm}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}

        <div className="fixed bottom-4 right-4 z-50">
          <AlertComponent
            showAlert={this.state.showUsedAlert}
            alertType="success"
            alertMessage={`Reward used successfully.`}
          />
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation(RedeemedRewards);
