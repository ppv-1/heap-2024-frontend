import React, { Component } from "react";
import UserService from '../services/UserService';
import withNavigateandLocation from './withNavigateandLocation';
import "./css/Signup.css";

class RegisterOrganisation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            contactNo: '',
            email: '',
            password: '',
            location: '',
            website:'',
            description: ''
        };

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeContactNoHandler = this.changeContactNoHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeWebsiteHandler = this.changeWebsiteHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    createUser = (e) => {
        e.preventDefault();
        let user = {email: this.state.email, fullName: this.state.name, password: this.state.password, contactNo: this.state.contactNo, location: this.state.location, website: this.state.website, description: this.state.description};
        console.log('user => ' + JSON.stringify(user));

        UserService.createOrganisation(user).then(res => {
            this.props.navigate('/login');
        });
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
    changeLocationHandler= (event) => {
        this.setState({location: event.target.value});
    }

    changeWebsiteHandler= (event) => {
        this.setState({website: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    render() {
        return (
            <>
                <div className="signup-wrapper">
                    <h1 className="title">Sign Up</h1>

                    <form>
                        <label>
                            <p>Organisation Name</p>
                            <input type="text" required value={this.state.name} onChange={this.changeNameHandler}/>
                        </label>
                        <label>
                            <p>Contact Number</p>
                            <input type="tel" pattern="[0-9]{4}-[0-9]{4}" required value={this.state.contactNo}
                                   onChange={this.changeContactNoHandler}/>
                        </label>
                        <label>
                            <p>Email Address</p>
                            <input type="email" required value={this.state.email} onChange={this.changeEmailHandler}/>
                        </label>
                        <label>
                            <p>Organisation Location</p>
                            <input required type="text" value={this.state.location} onChange={this.changeLocationHandler}/>
                        </label>
                        <label>
                            <p>Organisation Website (optional)</p>
                            <input type="text" value={this.state.website} onChange={this.changeWebsiteHandler}/>
                        </label>
                        <label>
                            <p>Organisation Description (optional)</p>
                            <textarea value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        </label>
                        <label>
                            <p>Password</p>
                            <input required type="password" value={this.state.password} onChange={this.changePasswordHandler}/>
                        </label>
                        <div className="button-container">
                            <button className="btn btn-wide" onClick={this.createUser}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default withNavigateandLocation(RegisterOrganisation);