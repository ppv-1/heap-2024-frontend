import { ProtectedAPI } from './ProtectedAPI';

class VolunteerService{

    async registerEvent(eventId, userId) {
        return await ProtectedAPI.post(`/volunteer/register/event/${eventId}`, userId,{headers: {
            'Content-Type': 'text/plain'
        }});
    }

    async getRegisteredEvents(){
        return await ProtectedAPI.get(`/volunteer/registeredEvents`);
    }

    async unregisterEvent(eventId){
        return await ProtectedAPI.post(`/volunteer/unregister/event/${eventId}`, "");
    }

    async updateVolunteer(profile){
        return await ProtectedAPI.put(`/updateDetails`, profile, {headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }});
    }

}
export default new VolunteerService();