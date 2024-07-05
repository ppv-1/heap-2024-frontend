import { ProtectedAPI } from "./ProtectedAPI";
import { API } from "./API";

class RewardService {
  async createReward(reward) {
    return await ProtectedAPI.post(`/reward/reward-category/create`, reward, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      "Content-Type": "multipart/form-data",
    });
  }

<<<<<<< Updated upstream
  async getAllRewards() {
    return await ProtectedAPI.get(`/reward/reward-category/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
=======
    async createReward(reward){
        return await ProtectedAPI.post(`/reward/reward-category/create`, reward, {headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }});
    }
>>>>>>> Stashed changes

  async getReward(rewardId) {
    return await ProtectedAPI.get(`/reward/get/${rewardId}`);
  }

  async deleteRewards(rewardId) {
    return await ProtectedAPI.delete(
      `/reward/reward-category/delete/${rewardId}`
    );
  }

  async updateReward(rewardId, reward) {
    return await ProtectedAPI.put(
      `/reward/reward-category/update/${rewardId}`,
      reward
    );
  }
}

export default new RewardService();
