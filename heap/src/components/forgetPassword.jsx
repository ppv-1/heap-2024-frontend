import React, { Component } from "react";
import "./css/Create.css";
import withNavigate from "./withNavigateandLocation";
import AuthService from "../services/AuthService";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
  
  }



  handleChangeEmail = (event) => {
    const email = event.target.value;
    this.setState({ email });
  };


  

  handleForgetPasswordClick = async () => {
    console.log(this.state.email);
    await AuthService.forgetPassword(this.state.email).then(alert("An email has been sent to reset your password"));
    
  };

  render() {
    const { email } = this.state;
    return (
      <>
        <div className="content">
          <h1 className="title">Forget Password</h1>
          <form>
            <label>
              <p>Enter email</p>
              <input
                required
                type="text"
                value={email}
                onChange={this.handleChangeEmail}
              />
            </label>
            <div className="button-container">
              <button
                className="btn btn-wide"
                onClick={this.handleForgetPasswordClick}
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withNavigate(ForgetPassword);
