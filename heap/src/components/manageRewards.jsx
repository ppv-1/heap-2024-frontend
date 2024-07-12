import React, { Component } from "react";
import "./css/Admin.css";
import withNavigateandLocation from "./withNavigateandLocation";
import RewardService from "../services/RewardService";
import MediaService from "../services/MediaService";

class ManageRewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      images: {}, // To store the images for each reward
      loading: true, // To manage the loading state
    };
  }

  uploadReward = (event, id) => {
    event.preventDefault();
    this.refs[`fileInput-${id}`].click();
  };

  handleFileChange = async (event, id) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        await RewardService.uploadReward(id, formData); // Assuming this method exists in your MediaService
        alert("Barcode uploaded successfully");
      } catch (error) {
        console.error("Error uploading barcodes:", error);
        alert("An error occurred while uploading the barcodes.");
      }
    }
  };

  editReward = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/edit-reward/${id}`);
  };

  deleteReward = async (event, id) => {
    event.preventDefault();
    let result = window.confirm("Are you sure you want to delete this reward?");
    if (result) {
      await RewardService.deleteRewards(id);
      window.location.reload();
      alert("Reward successfully deleted");
    }
  };

  createRewardHandler = (event) => {
    event.preventDefault();
    this.props.navigate("/create-reward");
  };

  fetchData = async () => {
    try {
      const res = await RewardService.getAllRewards();
      console.log(JSON.stringify(res.data));
      console.log(res.data + typeof res.data);
      console.log(res.data.rewards);

      const rewards = res.data.rewards;
      this.setState({ items: rewards });

      // Fetch images for each reward
      const images = await Promise.all(
        rewards.map(async (reward) => {
          const imageRes = await MediaService.getRewardMedia(reward.id);
          return {
            id: reward.id,
            imageUrl: `data:image/jpeg;base64,${imageRes.data}`,
          };
        })
      );

      // Convert array of images to an object with reward id as key
      const imagesObject = images.reduce((acc, curr) => {
        acc[curr.id] = curr.imageUrl;
        return acc;
      }, {});

      this.setState({ images: imagesObject, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    const { items, images, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while fetching data
    }

    return (
      <div className="wrapper">
        <h1 className="title">Rewards</h1>
        <div className="reward-button-container">
          <button
            className="btn btn-primary"
            onClick={this.createRewardHandler}
          >
            Add new reward
          </button>
        </div>
        <br />
        <div className="reward-listing">
          {items.map((item) => (
            <div
              key={item.id}
              className="card card-compact w-30 bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={
                    images[item.id] ||
                    "https://cdn-icons-png.flaticon.com/512/1426/1426770.png"
                  }
                  alt={item.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <input
                  type="file"
                  ref={`fileInput-${item.id}`}
                  style={{ display: "none" }}
                  onChange={(event) => this.handleFileChange(event, item.id)}
                />
                <button
                  className="btn btn-primary"
                  onClick={(event) => this.uploadReward(event, item.id)}
                >
                  Upload Barcodes
                </button>
                <button
                  className="btn btn-primary"
                  onClick={(event) => this.editReward(event, item.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary"
                  onClick={(event) => this.deleteReward(event, item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation(ManageRewards);
