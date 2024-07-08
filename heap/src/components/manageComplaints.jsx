import React, { Component } from "react";
import "./css/Organisations.css";
import withNavigateandLocation from "./withNavigateandLocation";
import MediaService from "../services/MediaService";
import ComplaintService from "../services/ComplaintService";

class ManageComplaints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      images: {}, // To store the images for each complaint
      loading: true // To manage the loading state
    };
  }

  fetchData = async () => {
    try {
      const res = await ComplaintService.getAllComplaints();
      console.log(JSON.stringify(res.data));
      console.log(res.data + typeof res.data);
      console.log(res.data.complaints);
      
      const complaints = res.data.complaints;
      this.setState({ items: complaints });

    //   // Fetch images for each 
    //   const images = await Promise.all(rewards.map(async (reward) => {
    //     const imageRes = await MediaService.getRewardMedia(reward.id);
    //     return { id: reward.id, imageUrl: `data:image/jpeg;base64,${imageRes.data}` };
    //   }));

      // Convert array of images to an object with reward id as key
    //   const imagesObject = images.reduce((acc, curr) => {
    //     acc[curr.id] = curr.imageUrl;
    //     return acc;
    //   }, {});

    //   this.setState({ images: imagesObject, loading: false });

    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data.');
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  complaintSubmit = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/complaint/${id}`);
  };

  render() {
    const { items, images, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while fetching data
    }

    return (
      <div className="wrapper">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>
        <h1 className="title">Complaints</h1>
        <p>Here you can find information about different complaints.</p>
        <br />
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="card card-compact w-30 bg-base-100 shadow-xl"
            >
              <figure>
                <img
                  src={images[item.id] || "https://cdn-icons-png.flaticon.com/512/1426/1426770.png"}
                  alt={item.title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>Complaint</p>
                <button
                  className="btn btn-primary"
                  onClick={(event) => this.complaintSubmit(event, item.id)}
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

export default withNavigateandLocation(ManageComplaints);
