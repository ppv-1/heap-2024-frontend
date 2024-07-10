import React, { Component } from "react";
// import withNavigateandLocation from "./withNavigateandLocation";

class ModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
        modalVisible: false,
    };
  }

  componentDidMount() {}

  render() {
    const { modalVisible, modalType, selected, handleConfirm, closeModal } = this.props;

    return (
      <dialog className="modal modal-bottom sm:modal-middle" open>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to 
            {modalType === "verify" && "verify "}
            {modalType === "blacklist" && "blacklist "}
            {modalType === "whitelist" && "whitelist "}
            {modalType === "delete" && "delete "} {selected?.fullName}?
          </h3>
          <p className="py-4">Please confirm your choice.</p>
          <div className="modal-action">
            <button className="btn" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    );
  }
}

export default ModalComponent;
