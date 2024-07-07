import { ProtectedAPI } from './ProtectedAPI';

class MediaService{

    async uploadPfp(image){
        return await ProtectedAPI.post(`/media/pfp/upload`, image, {'Content-Type': 'multipart/form-data'} );
    }

    async uploadRewardPhoto(rewardId, image){
        return await ProtectedAPI.post(`/media/reward-category/reward-image/upload/${rewardId}`, image, {'Content-Type': 'multipart/form-data'} );
    }

    async getPfp(){
        return await ProtectedAPI.get(`/media/pfp/get`);
    }

    async getRewardMedia(rewardId){
        return await ProtectedAPI.get(`/media/reward-category/reward-image/upload/${rewardId}`);
    }

}

export default new MediaService()