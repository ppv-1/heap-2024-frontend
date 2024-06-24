import axios from "axios";

const ADMIN_API_BASE_URL = "http://localhost:8080/api/v1/admin"

class AdminService{

    async verifyOrg(orgId){
        return await axios.get(ADMIN_API_BASE_URL + "/verify/" + orgId, {headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }

}

export default new AdminService()