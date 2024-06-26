import React, { Component } from "react";
import "./css/Organisations.css";
import withNavigateandLocation from "./withNavigateandLocation";
import RewardService from "../services/RewardService";

class ManageRewards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    editReward = (event, id) => {
        event.preventDefault();
        this.props.navigate(`/edit-reward/${id}`);
    }

    deleteReward = async (event, id) => {
        event.preventDefault();
        let result = window.confirm("Are you sure you want to delete this reward?");
        if(result){
            await RewardService.deleteRewards(id);
            window.location.reload();
            alert("Reward successfully deleted");
        }
    }

    createRewardHandler= (event) => {
        event.preventDefault();
        this.props.navigate('/create-reward');
    }

    fetchData = async () => {

        const res = await RewardService.getAllRewards();
        console.log(JSON.stringify(res.data));
        console.log(res.data + typeof res.data);
        console.log(res.data.rewards);
        this.setState({ items: res.data.rewards });
    }
    async componentDidMount() {
        await this.fetchData();
    }

    render() {
        let items = this.state.items;
        return (
            <div className="wrapper">
                <h1 className="title">Rewards</h1>
                <p>Here you can find information about different rewards.</p>
                <button
                    className="btn btn-primary"
                    onClick={this.createRewardHandler}
                    >
                    Add new reward
                </button>
                <br/>
                <div>
                    {items.map((item) => (
                        <div key={item.id} className="card card-compact w-30 bg-base-100 shadow-xl"
                             style={{filter: "drop-shadow(0px 0px 5px #555)", borderRadius: 10}}>
                            <figure>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1426/1426770.png"
                                    alt={item.name}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p>Reward</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={(event) => this.editReward(event, item.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={(event) => this.deleteReward(event, item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default withNavigateandLocation(ManageRewards);

