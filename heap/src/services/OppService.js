import { ProtectedAPI } from "./ProtectedAPI";
import { API } from "./API";

class OppService {
  async createOpp(opp) {
    return await ProtectedAPI.post(`/event/create`, opp);
  }

  async getOpp(eventId) {
    return await ProtectedAPI.get(`/event/get/${eventId}`);
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
    return await ProtectedAPI.get(`/event/${eventId}/participants`);
  }

  async setEventAttendance(eventId, attendanceList){
    return await ProtectedAPI.post(`/event/${eventId}/participants/attendance`, attendanceList);
  }

}

export default new OppService();
