import { ProtectedAPI } from './ProtectedAPI';

class MediaService{

    async uploadPfp(image){
        return await ProtectedAPI.post(`/media/pfp/upload`, image, {headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }, 'Content-Type': 'multipart/form-data'} )
    }

}

export default new MediaService()