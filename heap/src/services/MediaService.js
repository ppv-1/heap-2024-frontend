import { ProtectedAPI } from './ProtectedAPI';

class MediaService{

    async uploadPfp(image){
        return await ProtectedAPI.post(`/media/pfp/upload`, image, {headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }, 'Content-Type': 'multipart/form-data'} );
    }

    async uploadRewardPhoto(rewardId, image){
        return await ProtectedAPI.post(`/media/reward-category/reward-image/upload/${rewardId}`, image, {headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }, 'Content-Type': 'multipart/form-data'} );
    }

    async getPfp(){
        return await ProtectedAPI.get(`/media/pfp/get`, {headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }});
    }

}

export default new MediaService()