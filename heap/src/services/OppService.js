import axios from "axios";


const OPP_API_BASE_URL = "http://localhost:8080/api/v1/event"

class OppService {
    async createOpp(opp){
        return await axios.post(OPP_API_BASE_URL+"/create", opp, {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }});
    }

    async getOpp(eventId){
        return await axios.get(OPP_API_BASE_URL+"/get/" + eventId, {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

    async updateOpp(eventId, opp){
        return await axios.put(OPP_API_BASE_URL+"/update/" + eventId, opp, {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }});

    }

    async deleteOpp(eventId){
        return await axios.delete(OPP_API_BASE_URL+ "/delete/" + eventId,{headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

    async getAllOpps() {
        return await axios.get(OPP_API_BASE_URL+ "/all");
    }
    async getEventParticipants(eventId){
        return await axios.get(OPP_API_BASE_URL+ "/" + eventId + "/participants",{headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }});
    }

}

export default new OppService()