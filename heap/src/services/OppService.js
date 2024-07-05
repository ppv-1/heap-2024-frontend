import { ProtectedAPI } from "./ProtectedAPI";
import { API } from "./API";

class OppService {
  async createOpp(opp) {
    return await ProtectedAPI.post(`/event/create`, opp, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async getOpp(eventId) {
    return await API.get(`/event/get/${eventId}`);
  }

  async updateOpp(eventId, opp) {
    return await ProtectedAPI.put(`/event/update/${eventId}`, opp);
  }

  async deleteOpp(eventId) {
    return await ProtectedAPI.delete(`/event/delete/${eventId}`);
  }

  async getAllOpps() {
    return await API.get(`/event/all`);
  }

  async getEventParticipants(eventId) {
    return await ProtectedAPI.get(`/${eventId}/participants`);
  }
}

export default new OppService();
