import React, { Component } from "react";
import "./css/Admin.css";
import withNavigateandLocation from "./withNavigateandLocation";
import RewardService from "../services/RewardService";
import MediaService from "../services/MediaService";
import { Link } from "react-router-dom";

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
        window.location.reload();
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

      

      this.setState({ loading: false });
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
            Create new reward
          </button>
        </div>

        <div className="data-table">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Points Needed</th>
                  <th>Count</th>
                  <th>Upload Barcodes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">
                            <Link to={`/manage-rewards/${item.id}`}>{item.name}</Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.pointsNeeded}</td>
                    <td>{item.count}</td>
                    <td className="upload-container">
                      <input
                        type="file"
                        ref={`fileInput-${item.id}`}
                        style={{ display: "none" }}
                        onChange={(event) =>
                          this.handleFileChange(event, item.id)
                        }
                      />
                      <button
                        className="btn btn-neutral"
                        onClick={(event) => this.uploadReward(event, item.id)}
                      >
                        Upload
                      </button>
                    </td>
                    <td className="manage-button-container">
                      <button
                        className="btn btn-neutral"
                        onClick={(event) => this.editReward(event, item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={(event) =>
                          this.deleteVolHandler(event, item.email)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Points Needed</th>
                  <th>Count</th>
                  <th>Upload Barcodes</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation(ManageRewards);
