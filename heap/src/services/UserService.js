import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/user"
console.log("token: "+localStorage.getItem("token"));
const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/user",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Access-Control-Allow-Origin': 'http://localhost:3000"'
    },
});

class UserService {
    changePassword(token) {
        return axios.post(USER_API_BASE_URL+'/change-password', token);
    }

    getProfile() {
        // var token = localStorage.getItem("token");
        // return axios.get(USER_API_BASE_URL+'/profile', { headers : {Authorization : `Bearer ${token}`, "Content-Type":"text/plain"}})
        return api.get("/profile");

    }
}

export default new UserService()