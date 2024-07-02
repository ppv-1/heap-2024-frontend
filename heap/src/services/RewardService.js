import { ProtectedAPI } from './ProtectedAPI';
import {API} from './API';

class RewardService{

    async createReward(reward){
        return await ProtectedAPI.post(`/reward/create`, reward);
    }

    async getAllRewards(){
        console.log("hello this is get all rewards");
        return await ProtectedAPI.get(`/reward/all`);
    }

    async getReward(rewardId){
        return await ProtectedAPI.get(`/reward/get/${rewardId}`);
    }

    async deleteRewards(rewardId){
        return await ProtectedAPI.delete(`/reward/delete/${rewardId}`);
    }

    async updateReward(rewardId, reward){
        return await ProtectedAPI.put(`/reward/update/${rewardId}`, reward);
    }

}

export default new RewardService()