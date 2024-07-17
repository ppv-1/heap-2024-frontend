import React, { Component } from "react";
// import withNavigateandLocation from "./withNavigateandLocation";

class AlertComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { showAlert, alertType, alertMessage } = this.props;

    if (!showAlert) return null;

    const alertClass = `alert alert-${alertType}`;

    return (
      <div className="toast toast-end">
        <div className={alertClass}>
          <span>{alertMessage}</span>
        </div>
      </div>
      // <div className="fixed bottom-4 left-4">
      //   <div className={`toast ${alertClass}`}>
      //     <span>{alertMessage}</span>
      //   </div>
      // </div>
    );
  }
}

export default AlertComponent;
