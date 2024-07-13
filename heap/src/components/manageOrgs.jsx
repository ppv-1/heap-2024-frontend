import React, { Component } from "react";
import "./css/Admin.css";
import withNavigateandLocation from "./withNavigateandLocation";
import OrgService from "../services/OrgService";
import AdminService from "../services/AdminService";
import AlertComponent from "./alert";
import { Link } from "react-router-dom";

class ManageOrgs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      modalVisible: false,
      modalType: "",
      selectedOrg: null,
      showAlert: false,
      alertMessage: "",
    };
  }
  fetchData = async () => {
    const res = await OrgService.getAllOrgs();
    console.log(JSON.stringify(res.data));
    console.log("res.data.orgs=" + res.data.orgs);
    this.setState({ items: res.data.orgs });
  };

  async componentDidMount() {
    this.fetchData();
  }

  showModal = (modalType, selectedOrg) => {
    this.setState({ modalVisible: true, modalType, selectedOrg });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      modalType: "",
      selectedOrg: null,
      showAlert: true,
    });
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 3000);
  };

  handleConfirm = async (e) => {
    e.preventDefault();
    const { modalType, selectedOrg } = this.state;

    if (modalType === "verify") {
      await this.verifyOrg(selectedOrg.email);
    } else if (modalType === "blacklist") {
      await this.blacklistOrg(selectedOrg.email);
    } else if (modalType === "whitelist") {
      await this.whitelistOrg(selectedOrg.email);
    } else if (modalType === "delete") {
      await this.deleteOrg(selectedOrg.email);
    }

    this.closeModal();
  };

  verifyOrg = async (id) => {
    await AdminService.verifyOrg(id);
    this.updateOrgList(id);
    this.setState({ alertMessage: `Organisation ${id} verified.` });
  };

  blacklistOrg = async (id) => {
    await AdminService.blacklistUser(id);
    this.updateOrgList(id);
    this.setState({ alertMessage: `${id} blacklisted successfully.` });
  };

  whitelistOrg = async (id) => {
    await AdminService.whitelistUser(id);
    this.updateOrgList(id);
    this.setState({ alertMessage: `${id} whitelisted successfully.` });
  };

  deleteOrg = async (id) => {
    await AdminService.deleteUser(id);
    this.updateOrgList(id);
    this.setState({
      items: this.state.items.filter((item) => item.email !== id),
      alertMessage: `${id} deleted successfully.`,
    });
  };

  updateOrgList = (id, isLocked = null) => {
    const updatedItems = this.state.items.map((item) => {
      if (item.email === id) {
        if (isLocked !== null) {
          item.locked = isLocked;
        } else {
          item.locked = !item.locked;
        }
      }
      return item;
    });
    this.setState({ items: updatedItems });
  };

  verifyOrgHandler = (event, id) => {
    event.preventDefault();
    this.showModal(
      "verify",
      this.state.items.find((item) => item.email === id)
    );
  };

  blacklistOrgHandler = (event, id) => {
    event.preventDefault();
    this.showModal(
      "blacklist",
      this.state.items.find((item) => item.email === id)
    );
  };

  whitelistOrgHandler = (event, id) => {
    event.preventDefault();
    this.showModal(
      "whitelist",
      this.state.items.find((item) => item.email === id)
    );
  };

  deleteOrgHandler = (event, id) => {
    event.preventDefault();
    this.showModal(
      "delete",
      this.state.items.find((item) => item.email === id)
    );
  };

  // verifyOrgHandler = async (event, id) => {
  //   event.preventDefault();
  //   let result = window.confirm(
  //     "Are you sure you want to verify organisation " + id + "?"
  //   );
  //   if (result) {
  //     await AdminService.verifyOrg(id);
  //     window.location.reload();
  //     alert("Organisation " + id + " verified");
  //   }
  // };

  // blacklistOrgHandler = async (event, id) => {
  //   event.preventDefault();
  //   let result = window.confirm(
  //     "Are you sure you want to blacklist organisation " + id + "?"
  //   );

  //   if (result) {
  //     await AdminService.blacklistUser(id);
  //     // Assuming AdminService.blacklistUser(id) toggles the blacklist status

  //     // After the operation completes, update the state or modify the item directly
  //     let updatedItems = this.state.items.map((item) => {
  //       if (item.email === id) {
  //         // Toggle the state of the item's blacklist status
  //         item.locked = !item.locked;
  //       }
  //       return item;
  //     });

  //     // Update the state with the modified items array
  //     this.setState({ items: updatedItems });
  //     let item = updatedItems.find((item) => item.email === id);

  //     alert(
  //       "Organisation " + id + (item.locked ? " blacklisted" : " unblacklisted")
  //     );
  //   }
  // };

  // whitelistOrgHandler = async (event, id) => {
  //   event.preventDefault();
  //   let result = window.confirm(
  //     "Are you sure you want to whitelist organisation " + id + "?"
  //   );

  //   if (result) {
  //     await AdminService.whitelistUser(id);

  //     // After the operation completes, update the state or modify the item directly
  //     let updatedItems = this.state.items.map((item) => {
  //       if (item.email === id) {
  //         // Toggle the state of the item's blacklist status
  //         item.locked = !item.locked;
  //       }
  //       return item;
  //     });

  //     // Update the state with the modified items array
  //     this.setState({ items: updatedItems });
  //     let item = updatedItems.find((item) => item.email === id);

  //     alert(
  //       "Organisation " + id + (item.locked ? " blacklisted" : " whitelisted")
  //     );
  //   }
  // };

  // deleteOrgHandler = async (event, id) => {
  //   event.preventDefault();
  //   let result = window.confirm(
  //     "Are you sure you want to delete organisation " + id + "?"
  //   );
  //   if (result) {
  //     await AdminService.deleteUser(id);
  //     window.location.reload();
  //     alert("Organisation " + id + " deleted");
  //   }
  // };

  render() {
    let { items, modalVisible, modalType, selectedOrg } = this.state;
    return (
      <div className="wrapper">
        <h1 className="title">Manage Organisations</h1>
        <div className="data-table">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Verfication Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="font-bold">
                          <Link to={`/manage-orgs/${item.email}`}>
                            {item.fullName}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>
                      {item.verified ? (
                        "Verified"
                      ) : (
                        <div className="manage-button-container">
                          <button
                            className="btn btn-neutral"
                            onClick={(event) =>
                              this.verifyOrgHandler(event, item.email)
                            }
                          >
                            Verify
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="manage-button-container">
                      {item.locked ? (
                        <button
                          className="btn btn-neutral"
                          onClick={(event) =>
                            this.whitelistVolHandler(event, item.email)
                          }
                        >
                          Whitelist
                        </button>
                      ) : (
                        <button
                          className="btn btn-neutral"
                          onClick={(event) =>
                            this.blacklistVolHandler(event, item.email)
                          }
                        >
                          Blacklist
                        </button>
                      )}

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
                  <th>Email</th>
                  <th>Verfication Status</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {modalVisible && (
          <dialog className="modal modal-bottom sm:modal-middle" open>
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Are you sure you want to {modalType === "verify" && "verify"}
                {modalType === "blacklist" && "blacklist"}
                {modalType === "whitelist" && "whitelist"}
                {modalType === "delete" && "delete"} {selectedOrg?.fullName}?
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

        <AlertComponent
          showAlert={this.state.showAlert}
          alertType="success"
          alertMessage={this.state.alertMessage}
        />
      </div>

      // <div className="wrapper">
      //   <h1 className="title">Manage Organisations</h1>
      //   <br />
      //   <div>
      //     {items.map((item) => (
      //       <div
      //         key={item.id}
      //         className="card card-compact w-30 bg-base-100 shadow-xl"
      //       >
      //         <figure>
      //           <img
      //             src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
      //             alt={item.fullName}
      //           />
      //         </figure>
      //         <div className="card-body">
      //           <h2 className="card-title">{item.fullName}</h2>
      //           <p>Organisation</p>
      //           <button
      //             className="btn btn-primary"
      //             onClick={(event) => this.verifyOrgHandler(event, item.email)}
      //           >
      //             Verify
      //           </button>
      //           {item.locked ? (
      //             <button
      //               className="btn btn-primary"
      //               onClick={(event) =>
      //                 this.whitelistOrgHandler(event, item.email)
      //               }
      //             >
      //               Whitelist
      //             </button>
      //           ) : (
      //             <button
      //               className="btn btn-primary"
      //               onClick={(event) =>
      //                 this.blacklistOrgHandler(event, item.email)
      //               }
      //             >
      //               Blacklist
      //             </button>
      //           )}
      //           <button
      //             className="btn btn-primary"
      //             onClick={(event) => this.deleteOrgHandler(event, item.email)}
      //           >
      //             Delete
      //           </button>
      //         </div>
      //       </div>
      //     ))}
      //   </div>
      // </div>
    );
  }
}

export default withNavigateandLocation(ManageOrgs);
