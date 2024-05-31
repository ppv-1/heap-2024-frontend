import React, { Component } from "react";
import "./css/Profile.css";
import { Link, useLocation } from 'react-router-dom';
import withLocation from "./withLocation";

class OrganisationProfileComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { state } = this.props.location;
        console.log(state);
        return (
            <>
                <div className="banner h-screen flex justify-center items-center">
                    <div className="profile text-center mt-8 font-bold">
                        <div className="avatar">
                            <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                <img src="https://blog.hubspot.com/marketing/google-logo-history" alt="logo" />
                            </div>
                        </div>
                        <h1>{state.name}</h1>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="details-container h-screen flex justify-center items-center">
                    <div className="details">
                        <h1>Account</h1>
                        <br/>
                        <div>
                            <h2>Organisation Name</h2>
                            <p>{state.name}</p>
                        </div>
                        <div>
                            <h2>Email Address</h2>
                            <p>{state.email}</p>
                        </div>
                        <div>
                            <h2>Website</h2>
                            <p>{state.website}</p>
                        </div>
                        <div>
                            <h2>Description</h2>
                            <p>{state.description}</p>
                        </div>
                        <div>
                            <h2>Verified</h2>
                            <p>{state.verified}</p>
                        </div>
                        <div>
                            <h2>Password</h2>
                            <p>password</p>
                            <div className="change-password-container">
                                <button className="btn">Change password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default OrganisationProfileComponent;