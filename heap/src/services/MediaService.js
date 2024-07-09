import { ProtectedAPI } from './ProtectedAPI';

class MediaService{

    async uploadPfp(image){
        return await ProtectedAPI.post(`/media/pfp/upload`, image, {'Content-Type': 'multipart/form-data'} );
    }

    async uploadRewardPhoto(rewardId, image){
        return await ProtectedAPI.post(`/media/reward-category/reward-image/upload/${rewardId}`, image, {'Content-Type': 'multipart/form-data'} );
    }

    async uploadEventPhotos(eventId, images){
        return await ProtectedAPI.post(`/media/event-photos/upload/${eventId}`, images, {'Content-Type': 'multipart/form-data'} );
    }

    async getPfp(){
        return await ProtectedAPI.get(`/media/pfp/get`);
    }

    async getRewardMedia(rewardId){
        return await ProtectedAPI.get(`/media/reward-category/reward-image/upload/${rewardId}`);
    }

    async getEventPhotos(eventId){
        return await ProtectedAPI.get(`/media/event-photos/get/${eventId}` );
    }

}

export default new MediaService()