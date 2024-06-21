import React, { Component } from "react";
import withNavigateandLocation from './withNavigateandLocation';
import "./css/Create.css";
import OppService from "../services/OppService";

class CreateOppComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            date: '',
            startTime: '',
            endTime: '',
            location: '',
            manpowerCount: '',
            description: '',
            type: ''
        };

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeStartTimeHandler = this.changeStartTimeHandler.bind(this);
        this.changeEndTimeHandler = this.changeEndTimeHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changeManpowerCountHandler = this.changeManpowerCountHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.createOpp = this.createOpp.bind(this);
    }

    createOpp = (e) => {
        e.preventDefault();
        const { state } = this.props.location;
        console.log(state);
        let opp = {name: this.state.name, date: this.state.date, startTime: this.state.startTime, endTime: this.state.endTime, location: this.state.location,
                        manpowerCount: this.state.manpowerCount, description: this.state.description, type: this.state.type, organisation: localStorage.getItem("token")};
        console.log('opp => ' + JSON.stringify(opp));

        OppService.createOpp(opp).then(res => {
            this.props.navigate('/');
            console.log(res.status);
        });
        
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDateHandler= (event) => {
        this.setState({date: event.target.value});
    }

    changeStartTimeHandler= (event) => {
        this.setState({startTime: event.target.value});
    }

    changeEndTimeHandler= (event) => {
        this.setState({endTime: event.target.value});
    }

    changeLocationHandler= (event) => {
        this.setState({location: event.target.value});
    }

    changeManpowerCountHandler= (event) => {
        this.setState({manpowerCount: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeTypeHandler= (event) => {
        this.setState({type: event.target.value});
    }

    render() {
        // const { state } = this.props.location;
        console.log(this.state);
        console.log(this.state.user);
        return (
            <>
                <div className="wrapper">
                    <h1 className="title">Create Event</h1>

                    <form>
                        <label>
                            <p>Name</p>
                            <input type="text" required value={this.state.name} onChange={this.changeNameHandler}/>
                        </label>
                        <label>
                            <p>Date</p>
                            <input type="date" required value={this.state.date} onChange={this.changeDateHandler}/>
                        </label>
                        <label>
                            <p>Start Time</p>
                            <input type="time" required value={this.state.startTime}
                                   onChange={this.changeStartTimeHandler}/>
                        </label>
                        <label>
                            <p>End Time</p>
                            <input type="time" required value={this.state.endTime}
                                   onChange={this.changeEndTimeHandler}/>
                        </label>
                        <label>
                            <p>Location</p>
                            <input required type="text" value={this.state.location} onChange={this.changeLocationHandler}/>
                        </label>
                        <label>
                            <p>Manpower Count</p>
                            <input required type="number" value={this.state.manpowerCount}
                                   onChange={this.changeManpowerCountHandler}/>
                        </label>
                        <label>
                            <p>Type</p>
                            <input required type="text" value={this.state.type} onChange={this.changeTypeHandler}/>
                        </label>
                        <label>
                            <p>Description</p>
                            <textarea required value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        </label>
                        <div className="button-container">
                            <button className="btn btn-wide" onClick={this.createOpp}>Create</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default withNavigateandLocation(CreateOppComponent);