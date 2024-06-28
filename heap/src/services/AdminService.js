import axios from "axios";

const ADMIN_API_BASE_URL = "http://localhost:8080/api/v1/admin"

class AdminService{

    async verifyOrg(orgId){
        return await axios.get(ADMIN_API_BASE_URL + "/verify/" + orgId, {headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

    async blacklistUser(Id){
        
        return await axios.get(ADMIN_API_BASE_URL + "/blacklist/" + Id, {headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

    async whitelistUser(Id){
        return await axios.get(ADMIN_API_BASE_URL + "/whitelist/" + Id, {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }});
    }

    async deleteUser(Id){
        return await axios.get(ADMIN_API_BASE_URL + "/delete/" + Id, {headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

    async getAllVolunteers(){
        return await axios.get(ADMIN_API_BASE_URL + "/all-volunteers", {headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }
    

}

export default new AdminService()