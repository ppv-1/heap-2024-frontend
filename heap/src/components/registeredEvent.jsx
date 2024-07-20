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
      this.closeModal();
    }
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
    } = this.state;

    const sortedItems = items.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
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
        {sortedItems.length === 0 ? (
          <p>You have not signed up for any opportunities.</p>
        ) : (
          <>
            <p>These are the volunteer opportunities you are signed up for.</p>
            <br />
            <div className="event-listings">
              {sortedItems.map((item) => (
                <div className="card card-compact w-30 bg-base-100 shadow-xl">
                  <figure>
                    <img
                      src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
                      alt={item.name}
                    />
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
            alertMessage={`Deregistered from ${deregisteredEventName}.`}
          />
        </div>
      </div>
    );
  }
}

export default withNavigateandLocation(RegisteredEvent);
