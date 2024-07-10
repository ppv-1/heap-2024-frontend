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
      this.setState({ items: res.data.complaints, loading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    await this.fetchData();
  }

  complaintResolve = async (event, id) => {
    event.preventDefault();
    try {
      await ComplaintService.resolveComplaint(id);
      alert("Complaint " + id + " resolved");
      
      // Update the state to mark the complaint as resolved
      this.setState(prevState => ({
        items: prevState.items.map(item =>
          item.id === id ? { ...item, status: 'resolved' } : item
        )
      }));
    } catch (error) {
      console.error("Failed to resolve complaint", error);
    }
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
                  src={images[item.id] || "https://wewin.com/wp-content/uploads/2023/06/Complaint2-01-1024x577-1.webp"}
                  alt={item.title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={(event) => this.complaintResolve(event, item.id)}
                  disabled={item.status === 'resolved'} // Disable button if resolved
                >
                  {item.status === 'resolved' ? "Resolved" : "Resolve"}
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
