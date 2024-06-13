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
}

export default new OppService()