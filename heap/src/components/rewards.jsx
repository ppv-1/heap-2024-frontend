import React, { Component } from "react";
import "./css/Opportunities.css";
import withNavigateandLocation from "./withNavigateandLocation";
import RewardService from "../services/RewardService";
import Pagination from "./pagination";
import MediaService from "../services/MediaService";

class Rewards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      images: {}, // To store the images for each reward
      loading: true, // To manage the loading state
      currentPage: 1,
      postsPerPage: 8,
    };
  }

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
      // alert('An error occurred while fetching data.');
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  rewardSubmit = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/rewards/${id}`);
  };

  render() {
    const { items, images, loading,  currentPage, postsPerPage, } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while fetching data
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className="wrapper">
        {/* <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div> */}
        <h1 className="title">Rewards</h1>
        <p>Here you can find information about different rewards.</p>
        <br />
        <div className="event-listings">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="card card-compact w-30 bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={
                    item.mediaFilepath
                  }
                  alt={item.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <div className="badge-container">
                  <div className="badge badge-accent">
                    {item.pointsNeeded} Points
                  </div>
                  {item.count <= 0 && (
                    <div className="badge badge-neutral">Fully Redeemed</div>
                  )}
                </div>
                <button
                  className="btn"
                  onClick={(event) => this.rewardSubmit(event, item.id)}
                >
                  More info
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
            postsPerPage={postsPerPage}
            length={currentItems.length}
            paginate={this.handlePageChange}
        />
      </div>
    );
  }
}

export default withNavigateandLocation(Rewards);
