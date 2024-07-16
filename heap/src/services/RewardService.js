import { ProtectedAPI } from "./ProtectedAPI";
import { API } from "./API";

class RewardService {
  async createReward(reward) {
    return await ProtectedAPI.post(`/reward/reward-category/create`, reward);
  }

  async getAllRewards() {
    return await ProtectedAPI.get(`/reward/reward-category/all`);
  }

  async getReward(rewardId) {
    return await ProtectedAPI.get(`/reward/reward-category/get/${rewardId}`);
  }

  async deleteRewards(rewardId) {
    return await ProtectedAPI.delete(`/reward/reward-category/delete/${rewardId}`);
  }

  async updateReward(rewardId, reward) {
    return await ProtectedAPI.put(`/reward/reward-category/update/${rewardId}`, reward);
  }

  async uploadReward(rewardId, file){
    return await ProtectedAPI.post(`/reward/reward-category/upload-barcodes/${rewardId}`, file, {'Content-Type': 'multipart/form-data'});
  }

  async getRewardBarcodes(rewardCatId){
    return await ProtectedAPI.get(`/reward/reward-category/list-barcodes/${rewardCatId}`);
  }

  async deleteRewardBarcode(rewardCatId, rewardId){
    return await ProtectedAPI.get(`/reward/reward/delete/${rewardCatId}/${rewardId}`);
  }

  async redeemReward(rewardCatId){
    return await ProtectedAPI.get(`/reward/reward/redeem/${rewardCatId}`);
  }

  async getRedeemedRewards(){
    return await ProtectedAPI.get(`/reward/reward/all-redeemed`);
  }

  async useRewardBarcode(rewardId){
    return await ProtectedAPI.get(`/reward/reward/use/${rewardId}`);
  }

}

export default new RewardService();
