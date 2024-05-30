import React, { Component } from "react";
// import "./css/Signup.css";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            contactNo: '',
            email: '',
            password: ''
        };

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeContactNoHandler = this.changeContactNoHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    createUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, contactNo: this.state.contactNo, email: this.state.email, password: this.state.password};
        console.log('user => ' + JSON.stringify(user));
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeContactNoHandler= (event) => {
        this.setState({contactNo: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <>
                <div className="signup-wrapper">
                    <h1 className="title">Sign Up</h1>

                <form>
                    <label>
                        <p>Name</p>
                        <input type="text" value={this.state.name} onChange={this.changeNameHandler} />
                    </label>
                    <label>
                        <p>Contact Number</p>
                        <input type="tel" pattern="[0-9]{4}-[0-9]{4}" required value={this.state.contactNo} onChange={this.changeContactNoHandler} />
                    </label>
                    <label>
                        <p>Email Address</p>
                        <input type="email" value={this.state.email} onChange={this.changeEmailHandler} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" value={this.state.password} onChange={this.changePasswordHandler} />
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