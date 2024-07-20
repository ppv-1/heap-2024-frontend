import React, { Component } from "react";
import withNavigateandLocation from "./withNavigateandLocation";
import VolunteerService from "../services/VolunteerService";
import "./css/Opportunities.css";
import AlertComponent from "./alert";

class RegisteredEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      showRegAlert: false,
      showDeregAlert: false,
      modalVisible: false,
      selectedEvent: null,
      registeredEventName: "",
      deregisteredEventName: "",
      deregAlertMessage: "",
      filter: "all",
    };
  }

  unregisterSubmit = async (event, id) => {
    event.preventDefault();
    const selectedEvent = this.state.items.find((item) => item.id === id);
    this.showModal(selectedEvent);
  };

  detailsOpp = (event, id) => {
    event.preventDefault();
    this.props.navigate(`/opportunities/${id}`);
  };

  showModal = (selectedEvent) => {
    this.setState({ modalVisible: true, selectedEvent });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      deregisteredEventName: this.state.selectedEvent
          ? this.state.selectedEvent.name
          : "",
      selectedEvent: null,
      showDeregAlert: true,
      deregAlertMessage: "",
    });
    setTimeout(() => {
      this.setState({ showDeregAlert: false, deregisteredEventName: "" });
      window.location.reload();
    }, 3000);
  };

  handleConfirm = async (e) => {
    e.preventDefault();
    const { selectedEvent } = this.state;
    if (selectedEvent) {
      await VolunteerService.unregisterEvent(selectedEvent.id);
      this.setState({
        deregAlertMessage: `${selectedEvent.name} deregistered successfully.`,
      });
      this.closeModal();
    }
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  fetchData = async () => {
    const res = await VolunteerService.getRegisteredEvents();
    console.log(JSON.stringify(res.data));
    console.log(res.data + typeof res.data);
    this.setState({ items: res.data.events });
  };

  componentDidMount() {
    this.fetchData();
    if (this.props.location.state && this.props.location.state.showRegAlert) {
      this.setState(
          {
            showRegAlert: true,
            registeredEventName: this.props.location.state.registeredEventName,
          },
          () => {
            console.log("showAlert=", this.state.showRegAlert);
          }
      );
      setTimeout(() => {
        this.setState({ showRegAlert: false });
      }, 3000);
    }
    // const alertData = sessionStorage.getItem("showRegAlert");
    // if (alertData) {
    //   const { show, eventName } = JSON.parse(alertData);
    //   if (show) {
    //     this.setState(
    //       { showRegAlert: true, registeredEventName: eventName },
    //       () => {
    //         console.log("showAlert=", this.state.showRegAlert);
    //       }
    //     );
    //     setTimeout(() => {
    //       this.setState({ showRegAlert: false });
    //     }, 3000);
    //     sessionStorage.removeItem("showRegAlert");
    //   }
    // }
  }

  render() {
    const {
      items,
      selectedEvent,
      modalVisible,
      registeredEventName,
      deregisteredEventName,
      deregAlertMessage,
      filter,
    } = this.state;

    const sortedItems = items.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const filteredItems = sortedItems.filter((item) => {
      if (filter === "all") return true;
      if (filter === "past") return new Date(item.date) < new Date();
      if (filter === "upcoming") return new Date(item.date) >= new Date();
      return true;
    });

    return (
        <div className="wrapper">
          {/* <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </div> */}

          <h1 className="title">Registered Events</h1>

          {filteredItems.length === 0 ? (
              <div>
                <p>You have not signed up for any opportunities.</p>
                <div className="join">
                  <button
                      className={`btn join-item ${
                          filter === "all" ? "btn-active" : ""
                      }`}
                      onClick={() => this.changeFilter("all")}
                  >
                    All
                  </button>
                  <button
                      className={`btn join-item ${
                          filter === "past" ? "btn-active" : ""
                      }`}
                      onClick={() => this.changeFilter("past")}
                  >
                    Past
                  </button>
                  <button
                      className={`btn join-item ${
                          filter === "upcoming" ? "btn-active" : ""
                      }`}
                      onClick={() => this.changeFilter("upcoming")}
                  >
                    Upcoming
                  </button>
                </div>
              </div>
          ) : (
              <>
                <p>These are the volunteer opportunities you are signed up for.</p>
                <div className="join">
                  <button
                      className={`btn join-item ${
                          filter === "all" ? "btn-active" : ""
                      }`}
                      onClick={() => this.changeFilter("all")}
                  >
                    All
                  </button>
                  <button
                      className={`btn join-item ${
                          filter === "past" ? "btn-active" : ""
                      }`}
                      onClick={() => this.changeFilter("past")}
                  >
                    Past
                  </button>
                  <button
                      className={`btn join-item ${
                          filter === "upcoming" ? "btn-active" : ""
                      }`}
                      onClick={() => this.changeFilter("upcoming")}
                  >
                    Upcoming
                  </button>
                </div>
                <br />
                <div className="event-listings">
                  {sortedItems.map((item) => (
                      <div className="card card-compact w-30 bg-base-100 shadow-xl">
                        <figure>
                          <img src={item.photosFilepaths[0]} alt={item.name} />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">{item.name}</h2>
                          <div className="card-actions justify-end">
                            <button
                                className="btn"
                                onClick={(event) => this.detailsOpp(event, item.id)}
                            >
                              Details
                            </button>
                            <button
                                className="btn"
                                onClick={(event) =>
                                    this.unregisterSubmit(event, item.id)
                                }
                            >
                              Unregister
                            </button>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </>
          )}
          <div className="fixed bottom-4 right-4 z-50">
            <AlertComponent
                showAlert={this.state.showRegAlert}
                alertType="success"
                alertMessage={`Registered for ${registeredEventName}.`}
            />
          </div>

          {modalVisible && (
              <dialog className="modal modal-bottom sm:modal-middle" open>
                <div className="modal-box">
                  <h3 className="font-bold text-lg">
                    Are you sure you want to deregister from {selectedEvent?.name}?
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
                showAlert={this.state.showDeregAlert}
                alertType="success"
                alertMessage={deregAlertMessage}
            />
          </div>
        </div>
    );
  }
}

export default withNavigateandLocation(RegisteredEvent);
