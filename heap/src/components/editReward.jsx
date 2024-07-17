import React, { Component } from "react";
import { useParams } from "react-router-dom";
import withNavigateandLocation from './withNavigateandLocation';
import "./css/Create.css";
import RewardService from "../services/RewardService";
import MediaService from "../services/MediaService";

class EditReward extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            pointsNeeded: "",
            type: "",
            description: "",
            count: "",
            rewardMedia: null,
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePointsNeededHandler = this.changePointsNeededHandler.bind(this);
        this.changeRewardMediaHandler = this.changeRewardMediaHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeCountHandler = this.changeCountHandler.bind(this);
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
                type: res.data.type,
                description: res.data.description,
                count: res.data.count,
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

    changeTypeHandler= (event) => {
        this.setState({type: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeCountHandler = (event) => {
        this.setState({ count: event.target.value });
      };

    changeRewardMediaHandler= (event) => {
        this.setState({rewardMedia: event.target.files[0]});
    }

    editReward = async (e) => {
        e.preventDefault();
        const { state } = this.props.location;
        console.log(state);
        const formData = new FormData();
        formData.append("reward-image", this.state.rewardMedia);
        let reward = {
            name: this.state.name,
            pointsNeeded: this.state.pointsNeeded,
            type: this.state.type,
            description: this.state.description,
            count: this.state.count,
            
        };
        console.log('reward => ' + JSON.stringify(reward));
        const res = await RewardService.updateReward(this.state.id, reward);
        console.log(res);
        if (this.state.rewardMedia != null){
            MediaService.uploadRewardPhoto(res.data.id, formData).then((res) => {
                console.log(res);
            });
        }
        
    }

    render() {

        console.log(this.state);
        return (
            <>
                <div className="content">
                    <h1 className="title">Edit Reward</h1>

                    <form enctype="multipart/form-data">
                        <label>
                            <p>Name</p>
                            <input
                                type="text"
                                required
                                value={this.state.name}
                                onChange={this.changeNameHandler}
                            />
                        </label>
                        <label>
                            <p>Points Needed</p>
                            <input
                                type="number"
                                required
                                value={this.state.pointsNeeded}
                                onChange={this.changePointsNeededHandler}
                            />
                        </label>

                        <label>
                            <p>Reward Image</p>
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input file-input-bordered w-full max-w-xs"
                                onChange={this.changeRewardMediaHandler}
                            />
                            {/* <img
                            src={this.state.rewardMedia || "https://cdn-icons-png.flaticon.com/512/1426/1426770.png"}
                            alt={this.state.name}
                            /> */}
                        </label>
                        <label>
                            <p>Type</p>
                            <input
                                type="text"
                                required
                                value={this.state.type}
                                onChange={this.changeTypeHandler}
                            />
                        </label>
                        <label>
                            <p>Description</p>
                            <input
                                required
                                type="text"
                                value={this.state.description}
                                onChange={this.changeDescriptionHandler}
                            />
                        </label>
                        <label>
                            <p>Count</p>
                            <input
                                required
                                type="number"
                                value={this.state.count}
                                onChange={this.changeCountHandler}
                            />
                        </label>

                        <div className="button-container">
                            <button className="btn btn-wide" onClick={this.editReward}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }


}

export default withNavigateandLocation((props) => <EditReward {...props} params={useParams()} />);