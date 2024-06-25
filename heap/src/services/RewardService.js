import axios from "axios";

const REWARD_API_BASE_URL = "http://localhost:8080/api/v1/reward"

class RewardService{

    async createReward(reward){
        return await axios.post(REWARD_API_BASE_URL+"/create", reward, {headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

    async getAllRewards(){
        return await axios.get(REWARD_API_BASE_URL + "/all", {headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

    async getReward(rewardId){
        return await axios.get(REWARD_API_BASE_URL + "/get/" + rewardId, {headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

    async deleteRewards(rewardId){
        return await axios.delete(REWARD_API_BASE_URL + "/delete/" + rewardId, {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }});
    }

    async updateReward(rewardId, reward){
        return await axios.put(REWARD_API_BASE_URL + "/update/" + rewardId, reward, {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }});
    }

}

export default new RewardService()