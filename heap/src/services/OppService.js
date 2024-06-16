import axios from "axios";


const OPP_API_BASE_URL = "http://localhost:8080/api/v1/event"
const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/event",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
});
class OppService {
    async createOpp(opp){
        return await api.post('/create', opp);
    }

    async getOpp(eventId){
        return await api.get(OPP_API_BASE_URL + "/get/" + eventId);
    }

    async getAllOpps() {
        // var token = localStorage.getItem("token");
        // return axios.get(USER_API_BASE_URL+'/profile', { headers : {Authorization : `Bearer ${token}`, "Content-Type":"text/plain"}})
        // console.log("token: "+localStorage.getItem("token"));
        
            return await axios.get(OPP_API_BASE_URL+ "/all");

    }


}

export default new OppService()