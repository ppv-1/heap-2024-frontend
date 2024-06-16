import React, { Component } from "react";
import UserService from '../services/UserService';
import withNavigateandLocation from './withNavigateandLocation';
import "./css/Signup.css";
import AuthService from "../services/AuthService";

class SignUp extends Component {
    constructor(props) {
        super(props);

    }

    volunteerSignUpHandler = (event) => {
        event.preventDefault();
        this.props.navigate("/register-volunteer");
    }

    orgSignUpHandler = (event) => {
        event.preventDefault();
        this.props.navigate("/register-organisation");
    }
    

    render() {
        return (
            <>
                <div className="signup-wrapper">
                    <h1 className="title">Sign Up</h1>

                    <h1 className="sub-title">What would you like to sign up as?</h1>

                    <div className="card card-compact w-30 bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZMZP9S-Owbsi_iW7-yJaMSLX3CfQTpIu1Sg&s"
                                alt="Volunteer"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Volunteer</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={this.volunteerSignUpHandler}>Sign Up</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-compact w-30 bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Vilnius_Marathon_2015_volunteers_by_Augustas_Didzgalvis.jpg"
                                alt="Organisation"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Organisation</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={this.orgSignUpHandler}>Sign Up</button>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export default withNavigateandLocation(SignUp);