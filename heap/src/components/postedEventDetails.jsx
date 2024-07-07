import React, { Component } from "react";
import "./css/OpportunityDetails.css";
import { useParams } from "react-router-dom";
import withNavigateandLocation from "./withNavigateandLocation";
import OppService from "../services/OppService";
// import UserService from "../services/UserService";
// import VolunteerService from "../services/VolunteerService";
import OrgService from "../services/OrgService";

class PostedEventDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opportunity: null,
            loading: true,
            orgName: null,
            participants: []
        };

    }

    fetchData = async () => {
        const { id } = this.props.params;

        try {
            const res = await OppService.getOpp(id);
            const org = await OrgService.getOrg(res.data.organisation);
            const participants = await OppService.getEventParticipants(id);
            console.log(res.status);
            console.log(res.data);
            console.log("participants =>" + participants.data);
            this.setState({
                opportunity: res.data,
                loading: false,
                orgName: org.data.fullName,
                participants: participants.data.vols
            });
        } catch (error) {
            console.error("Failed to fetch opportunity", error);
        }
    };

    async componentDidMount() {
        await this.fetchData();
    }

    render() {
        const { opportunity, loading, orgName, participants } = this.state;
        console.log(this.state);

        if (loading) {
            return (
                <div className="wrapper">
                    <h1>Loading...</h1>
                </div>
            );
        }

        if (!opportunity) {
            return (
                <div className="wrapper">
                    <h1>Opportunity not found.</h1>
                </div>
            );
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
                            <li>{opportunity.name}</li>
                        </ul>
                    </div>
                </div>
                <div className="details-container">
                    <div className="left-container">
                        <h1 className="title">
                            {opportunity.name} @ {orgName}
                        </h1>

                        <br />
                        <div className="left-details">
                            <p>Description: {opportunity.description}</p>
                            <p>Manpower needed: {opportunity.neededManpowerCount}</p>
                            <p>Type: {opportunity.type}</p>
                            <ul className="event-listings">
                                {participants.map((item) => (
                                    <div
                                        key={item.id}
                                        className="card card-compact w-30 bg-base-100 shadow-xl"
                                    >
                                        <figure>
                                            <img
                                                src="https://static.wixstatic.com/media/7ab21d_0065f074991045f19085036583d803c7~mv2.png/v1/fill/w_365,h_174,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SICS%20Logo.png"
                                                alt={item.name}
                                            />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{item.fullName}</h2>
                                            <h1>{item.id}</h1>
                                            <p>Volunteer</p>
                                            <div className="card-actions justify-end">
                                                <button
                                                    className="btn btn-neutral"

                                                >
                                                    Mark attendance
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>

                    </div>
                    <div className="right-container">
                        <div className="right-details">
                            <div className="card w-150 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h1>Location</h1>
                                    <p>{opportunity.location}</p>
                                    <h1>Date and time</h1>
                                    <p>Date: {opportunity.date}</p>
                                    <p>Start: {opportunity.startTime}</p>
                                    <p>End: {opportunity.endTime}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Wrap Opportunity with withNavigateandLocation to pass params to class component
export default withNavigateandLocation((props) => (
    <PostedEventDetails {...props} params={useParams()} />
));
