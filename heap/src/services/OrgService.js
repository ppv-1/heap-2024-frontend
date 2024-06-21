import axios from "axios";

const ORG_API_BASE_URL = "http://localhost:8080/api/v1/organization"

class OrganisationService{
    async getAllOrgs(){
        return await axios.get(ORG_API_BASE_URL+ "/all");
    }

    async getOrg(orgId){
        return await axios.get(ORG_API_BASE_URL + "/get/" + orgId);
    }

    // async getOrgEvents(orgId){
    //     return await axios.get(ORG_API_BASE_URL + "/" + orgId + "/events");
    // }
}

export default new OrganisationService()