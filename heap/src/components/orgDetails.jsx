import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OppService from "../services/OppService";
import UserService from "../services/UserService";
import VolunteerService from "../services/VolunteerService";
import OrgService from "../services/OrgService";

class OrgDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            organisation: null,
            loading: true,

        };

    }

    fetchData = async () => {
        const { id } = this.props.params;

        try {
            const res = await OrgService.getOrg(id);
            console.log(res.status);
            console.log(res.data);
            this.setState({ organisation: res.data, loading: false });
        } catch (error) {
            console.error("Failed to fetch organisation", error);
        }
    }

    async componentDidMount() {
        await this.fetchData();
    }

    // registerEvent = async (event) =>{
    //     const eventId = this.props.params.id;
    //     console.log(eventId);
    //     const res = await UserService.getProfile();
    //     console.log(res.data);
    //     const userId = res.data.email;
    //     console.log(userId);
    //     // let userId = {userId: res.data.email};
    //     // console.log(userId);
    //     await VolunteerService.registerEvent(eventId, userId);
    //     alert("You have successfully registered for this event");
    // }

    render() {
        const { organisation, loading} = this.state;
        console.log(this.state);

        if (loading) {
            return <div>Loading...</div>;
        }

        if (!organisation) {
            return <div>organisation not found</div>;
        }

        return (
            <div className="wrapper">
                <div className="breadcrumbs-container">
                    <div className="breadcrumbs text-sm">
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/opportunities">Volunteer</a>
                            </li>
                            <li>{organisation.fullName}</li>
                        </ul>
                    </div>
                </div>
                <div className="details-container">
                    <div className="left-container">
                        <div className="left-details">
                            <h1 className="title">{organisation.fullName}</h1>
                            <br />
                            <p>Description: {organisation.description}</p>
                            <p>Location: {organisation.location}</p>
                            <p>Website: {organisation.website}</p>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="right-details">
                            <h1 className="title">Contact No.</h1>
                            <p>Contact No.{organisation.contactNo}</p>
                            <h1 className="title">Email</h1>
                            <p>Email: {organisation.email}</p>

                            <div className="button-container">
                                <button className="btn btn-wide" onClick={this.registerEvent}>
                                    I want to volunteer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Wrap OrgDetails with withNavigateandLocation to pass params to class component
export default withNavigateandLocation((props) => <OrgDetails {...props} params={useParams()} />);
