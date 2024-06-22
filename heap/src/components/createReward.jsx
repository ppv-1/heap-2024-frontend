import React, { Component } from "react";
import withNavigateandLocation from './withNavigateandLocation';
import "./css/Create.css";
import RewardService from "../services/RewardService";

class CreateReward extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            pointsNeeded: '',
            barcodeSerialNo: '',
            type: '',
            description: ''
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePointsNeededHandler = this.changePointsNeededHandler.bind(this);
        this.changeBarcodeSerialNoHandler = this.changeBarcodeSerialNoHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        
    }

    createReward = (event) => {
        event.preventDefault();
        const { state } = this.props.location;
        console.log(state);
        let reward = {
            name: this.state.name, 
            pointsNeeded: this.state.pointsNeeded, 
            barcodeSerialNo: this.state.barcodeSerialNo, 
            type: this.state.type, 
            description: this.state.description
        };
        console.log('reward => ' + JSON.stringify(reward));
    
        RewardService.createReward(reward).then(res => {
            this.props.navigate('/');
            console.log(res.status);
        });
    }


    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }
    
    changePointsNeededHandler= (event) => {
        this.setState({pointsNeeded: event.target.value});
    }
    
    changeBarcodeSerialNoHandler= (event) => {
        this.setState({barcodeSerialNo: event.target.value});
    }
    
    changeTypeHandler= (event) => {
        this.setState({type: event.target.value});
    }
    
    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    
    render() {
      
        console.log(this.state);
        return (
            <>
                <div className="wrapper">
                    <h1 className="title">Create Reward</h1>

                    <form>
                        <label>
                            <p>Name</p>
                            <input type="text" required value={this.state.name} onChange={this.changeNameHandler}/>
                        </label>
                        <label>
                            <p>Points Needed</p>
                            <input type="number" required value={this.state.pointsNeeded} onChange={this.changePointsNeededHandler}/>
                        </label>
                        <label>
                            <p>Barcode Serial No.</p>
                            <input type="number" required value={this.state.barcodeSerialNo}
                                   onChange={this.changeBarcodeSerialNoHandler}/>
                        </label>
                        <label>
                            <p>Type</p>
                            <input type="text" required value={this.state.type}
                                   onChange={this.changeTypeHandler}/>
                        </label>
                        <label>
                            <p>Description</p>
                            <input required type="text" value={this.state.description} onChange={this.changeDescriptionHandler}/>
                        </label>
        
                        <div className="button-container">
                            <button className="btn btn-wide" onClick={this.createReward}>Create</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }


}



export default withNavigateandLocation(CreateReward);