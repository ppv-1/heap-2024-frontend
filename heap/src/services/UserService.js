import { ProtectedAPI } from './ProtectedAPI';

class UserService {
    async changePassword(credentials) {
        return await ProtectedAPI.get(`/user/change-password`, credentials);
    }

    async getProfile() {
        return await ProtectedAPI.get(`/user/profile`, {headers:{
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }});

    }

    async registerEvent(eventId) {
        return await ProtectedAPI.post(`/user/register/event/${eventId}`);
    }
}
export default new UserService();
