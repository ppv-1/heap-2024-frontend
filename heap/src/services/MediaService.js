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

    async uploadComplaintPhotos(complaintId, images){
        return await ProtectedAPI.post(`/media/complaint/complaint-image/upload/${complaintId}`, images, {'Content-Type': 'multipart/form-data'} );
    }

}

export default new MediaService()