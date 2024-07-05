import React, { Component } from "react";
import withNavigateandLocation from './withNavigateandLocation';
import "./css/Create.css";
import RewardService from "../services/RewardService";
import MediaService from "../services/MediaService";

class CreateReward extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            pointsNeeded: '',
            rewardMedia: null,
            type: '',
            description: '',
            count: '',
            
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePointsNeededHandler = this.changePointsNeededHandler.bind(this);
        this.changeRewardMediaHandler = this.changeRewardMediaHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeCountHandler = this.changeCountHandler.bind(this);
        
    }

    createReward = (event) => {
        event.preventDefault();
        const { state } = this.props.location;
        const formData = new FormData();
        formData.append("media", this.state.rewardMedia);
        let reward = {
            name: this.state.name,
            pointsNeeded: this.state.pointsNeeded,
            type: this.state.type,
            description: this.state.description,
            count: this.state.count
        }
        console.log('reward => ' + JSON.stringify(reward));
        MediaService.uploadRewardPhoto(formData);
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
    
    changeRewardMediaHandler= (event) => {
        this.setState({rewardMedia: event.target.value});
    }
    
    changeTypeHandler= (event) => {
        this.setState({type: event.target.value});
    }
    
    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeCountHandler= (event) => {
        this.setState({count: event.target.value});
    } 
    
    render() {
      
        console.log(this.state);
        return (
            <>
                <div className="wrapper">
                    <h1 className="title">Create Reward</h1>

                    <form enctype="multipart/form-data">
                        <label>
                            <p>Name</p>
                            <input type="text" required value={this.state.name} onChange={this.changeNameHandler}/>
                        </label>
                        <label>
                            <p>Points Needed</p>
                            <input type="number" required value={this.state.pointsNeeded} onChange={this.changePointsNeededHandler}/>
                        </label>

                        <label>
                            <p>Reward Image</p>
                            <input type="file" accept="image/*" required value={this.state.rewardMedia}
                                   onChange={this.changeRewardMediaHandler}/>
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
                        <label>
                            <p>Count</p>
                            <input required type="number" value={this.state.count} onChange={this.changeCountHandler}/>
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