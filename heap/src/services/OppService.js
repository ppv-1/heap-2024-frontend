import axios from "axios";

const OPP_API_BASE_URL = "http://localhost:8080/api/v1/event"

class OppService {
    createOpp(opp){
        return axios.post(OPP_API_BASE_URL+'/create', opp);
    }
}

export default new OppService()