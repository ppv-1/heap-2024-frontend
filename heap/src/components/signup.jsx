import React, { Component } from "react";
// import "./css/Signup.css";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <>
                <div className="signup-wrapper">
                    <h1 className="title">Sign Up</h1>

                <form>
                    <label>
                        <p>Name</p>
                        <input type="text" />
                    </label>
                    <label>
                        <p>Contact Number</p>
                        <input type="tel" pattern="[0-9]{4}-[0-9]{4}" required/>
                    </label>
                    <label>
                        <p>Email Address</p>
                        <input type="email" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" />
                    </label>
                    <div className="button-container">
                        <button className="btn btn-wide">Sign Up</button>
                    </div>
                </form>
                </div>
            </>
        );
    }
}

export default Signup;