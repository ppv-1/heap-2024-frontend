import axios from "axios";

const REWARD_API_BASE_URL = "http://localhost:8080/api/v1/reward"

class RewardService{

    async createReward(reward){
        return await axios.post(REWARD_API_BASE_URL+"/create", reward, {headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

}

export default new RewardService()