import React, { Component } from "react";
import "./css/Admin.css";
import withNavigateandLocation from "./withNavigateandLocation";
import MediaService from "../services/MediaService";
import ComplaintService from "../services/ComplaintService";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import AlertComponent from "./alert";

class ManageComplaints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      images: {}, // To store the images for each complaint
      loading: true, // To manage the loading state
      currentPage: 1,
      itemsPerPage: 10,
      showResolveAlert: false,
      itemName: "",
    };
  }

  fetchData = async () => {
    try {
      const res = await ComplaintService.getAllComplaints();
      this.setState({ items: res.data.complaints, loading: false });
      console.log(res.data.complaints);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      const resolvedItem = this.state.items.find((item) => item.id === id);
      // alert("Complaint " + id + " resolved");

      // Update the state to mark the complaint as resolved
      this.setState((prevState) => ({
        items: prevState.items.map((item) =>
            item.id === id ? { ...item, status: "resolved" } : item
        ),
        showResolveAlert: true,
        itemName: resolvedItem ? resolvedItem.title : "",
      }));

      setTimeout(() => {
        this.setState({ showResolveAlert: false, itemName: "" });
      }, 3000);
    } catch (error) {
      console.error("Failed to resolve complaint", error);
    }
  };

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { items, images, loading, currentPage, itemsPerPage } = this.state;

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while fetching data
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="wrapper">
          <h1 className="title">Feedback</h1>
          {items.length === 0 ? (
              <p>There are no complaints currently.</p>
          ) : (
              <>
                <div className="data-table">
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>User ID</th>
                        <th>Status</th>
                      </tr>
                      </thead>
                      <tbody>
                      {currentItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="font-bold">
                                  <Link to={`/manage-complaint/${item.id}`}>
                                    {item.id}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{item.title}</td>
                            <td>{item.userId}</td>
                            <td>
                              <button
                                  className="btn"
                                  onClick={(event) =>
                                      this.complaintResolve(event, item.id)
                                  }
                                  disabled={item.status === "resolved"} // Disable button if resolved
                              >
                                {item.status === "resolved"
                                    ? "Resolved"
                                    : "Resolve"}
                              </button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <Pagination
                    postsPerPage={itemsPerPage}
                    length={items.length}
                    paginate={this.paginate}
                />
              </>
          )}
          <div className="fixed bottom-4 right-4 z-50">
            <AlertComponent
                showAlert={this.state.showResolveAlert}
                alertType="success"
                alertMessage={`${this.state.itemName} resolved.`}
            />
          </div>
        </div>
    );
  }
}

export default withNavigateandLocation(ManageComplaints);
