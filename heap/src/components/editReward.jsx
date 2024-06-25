import React, { Component } from "react";
import { useParams } from "react-router-dom";
import withNavigateandLocation from './withNavigateandLocation';
import "./css/Create.css";
import RewardService from "../services/RewardService";

class EditReward extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            pointsNeeded: '',
            barcodeSerialNo: '',
            type: '',
            description: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePointsNeededHandler = this.changePointsNeededHandler.bind(this);
        this.changeBarcodeSerialNoHandler = this.changeBarcodeSerialNoHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    }

    async componentDidMount(){
        const { id } = this.props.params;
        try{
            const res = await RewardService.getReward(id);
            console.log(res.status);
            console.log(res.data);
            this.setState({
                id: res.data.id,
                name: res.data.name,
                pointsNeeded: res.data.pointsNeeded,
                barcodeSerialNo: res.data.barcodeSerialNo,
                type: res.data.type,
                description: res.data.description
            });
        } catch(error){
            console.error("failed to fetch reward", error);
        }
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

    editReward = (e) => {
        e.preventDefault();
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
        RewardService.updateReward(this.state.id, reward).then(res => {
            this.props.navigate('/');
            console.log(res.status);
        })
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
                            <button className="btn btn-wide" onClick={this.editReward}>Save</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }


}

export default withNavigateandLocation((props) => <EditReward {...props} params={useParams()} />);