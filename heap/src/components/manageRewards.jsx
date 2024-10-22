import React, { Component } from "react";
import "./css/Admin.css";
import withNavigateandLocation from "./withNavigateandLocation";
import RewardService from "../services/RewardService";
import MediaService from "../services/MediaService";
import { Link } from "react-router-dom";
import AlertComponent from "./alert";
import Pagination from "./pagination";

class ManageRewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      images: {}, // To store the images for each reward
      loading: true, // To manage the loading state
      modalVisible: false,
      selectedReward: null,
      showDelAlert: false,
      alertMessage: "",
      showBarcodeAlert: false,
      barcodeAlertMessage: "",
      currentPage: 1,
      postsPerPage: 10,
      showEditAlert: false,
      editedReward: "",
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
        await RewardService.uploadReward(id, formData);
        this.setState({
          showBarcodeAlert: true,
          barcodeAlertMessage: "Barcodes uploaded successfully.",
        });
        setTimeout(() => {
          this.setState({ showBarcodeAlert: false });
          window.location.reload();
        }, 3000);
      } catch (error) {
        console.error("Error uploading barcodes:", error);
        this.setState({
          showBarcodeAlert: true,
          barcodeAlertMessage:
              "An error occurred while uploading the barcodes.",
        });
        setTimeout(() => {
          this.setState({ showBarcodeAlert: false });
          window.location.reload();
        }, 3000);
      }
    }
  };

  editReward = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/edit-reward/${id}`);
  };

  // deleteReward = async (event, id) => {
  //   event.preventDefault();
  //   let result = window.confirm("Are you sure you want to delete this reward?");
  //   if (result) {
  //     await RewardService.deleteRewards(id);
  //     window.location.reload();
  //     alert("Reward successfully deleted");
  //   }
  // };

  // deleteReward = async (event, id) => {
  //   event.preventDefault();
  //   this.setState((prevState) => ({
  //     items: prevState.items.filter((item) => item.id !== id),
  //     alertMessage: `Reward ${id} deleted successfully.`,
  //   }));
  //   await RewardService.deleteRewards(id);
  // };

  deleteReward = async (event, id) => {
    event.preventDefault();
    this.setState({ modalVisible: true, selectedReward: id });
  };

  handleConfirm = async () => {
    const { selectedReward } = this.state;
    if (selectedReward) {
      try {
        await RewardService.deleteRewards(selectedReward);
        this.setState((prevState) => ({
          items: prevState.items.filter((item) => item.id !== selectedReward),
          showDelAlert: true,
          alertMessage: `Reward deleted successfully.`,
        }));
        setTimeout(() => {
          this.setState({ showDelAlert: false, alertMessage: '' });
        }, 3000);
      } catch (error) {
        console.error('Error deleting reward:', error);
      }
    }
    this.closeModal();
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

    if (this.props.location.state && this.props.location.state.showEditAlert) {
      this.setState(
          { showEditAlert: true, editedReward: this.props.location.state.editedReward },
          () => {
            console.log("showEditAlert=", this.state.showEditAlert);
          }
      );
      setTimeout(() => {
        this.setState({ showEditAlert: false, editedReward: "" });
      }, 3000);
    }
  }

  showModal = (selectedReward) => {
    this.setState({ modalVisible: true, selectedReward });
  };

  closeModal = () => {
    this.setState({ modalVisible: false, selectedReward: null });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const {
      items,
      loading,
      modalVisible,
      selectedReward,
      currentPage,
      postsPerPage,
    } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while fetching data
    }
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="wrapper">
          <h1 className="title">Rewards</h1>
          <div className="reward-button-container">
            <button className="btn" onClick={this.createRewardHandler}>
              Create new reward
            </button>
          </div>
          {items.length === 0 ? (
              <p>There are no rewards currently.</p>
          ) : (
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
                    {currentItems .map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-bold">
                                  <Link to={`/manage-rewards/${item.id}`}>
                                    {item.name}
                                  </Link>
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
                                style={{display: "none"}}
                                onChange={(event) =>
                                    this.handleFileChange(event, item.id)
                                }
                            />
                            <button
                                className="btn"
                                onClick={(event) => this.uploadReward(event, item.id)}
                            >
                              Upload
                            </button>
                          </td>
                          <td className="manage-button-container">
                            <button
                                className="btn"
                                onClick={(event) => this.editReward(event, item.id)}
                            >
                              Edit
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={(event) =>
                                    this.deleteReward(event, item.id)
                                }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                  <Pagination
                      postsPerPage={this.state.postsPerPage}
                      length={items.length}
                      paginate={this.handlePageChange}
                  />
                </div>
              </div>
          )}

          <div className="fixed bottom-4 right-4 z-50">
            <AlertComponent
                showAlert={this.state.showEditAlert}
                alertType="success"
                alertMessage={`${this.state.editedReward} edited successfully.`}
            />
          </div>

          {modalVisible && (
              <dialog className="modal modal-bottom sm:modal-middle" open>
                <div className="modal-box">
                  <h3 className="font-bold text-lg">
                    Are you sure you want to delete {selectedReward?.name}?
                  </h3>
                  <p className="py-4">Please confirm your choice.</p>
                  <div className="modal-action">
                    <button className="btn" onClick={this.handleConfirm}>
                      Confirm
                    </button>
                    <button className="btn" onClick={this.closeModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </dialog>
          )}

          <div className="fixed bottom-4 right-4 z-50">
            <AlertComponent
                showAlert={this.state.showDelAlert}
                alertType="success"
                alertMessage={this.state.alertMessage}
            />
          </div>

          <div className="fixed bottom-4 right-4 z-50">
            <AlertComponent
                showAlert={this.state.showBarcodeAlert}
                alertType="success"
                alertMessage={this.state.barcodeAlertMessage}
            />
          </div>
        </div>
    );
  }
}

export default withNavigateandLocation(ManageRewards);
