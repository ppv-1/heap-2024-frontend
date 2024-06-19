import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/user"
console.log("token: "+localStorage.getItem("token"));
// if (localStorage.getItem("token")) {
//     const api = axios.create({
//         baseURL: "http://localhost:8080/api/v1/user",
//
//     });
// } else {
//     const api = axios.create({
//         baseURL: "http://localhost:8080/api/v1/user",
//     });
// }


class UserService {
    async changePassword(credentials) {
        if (localStorage.getItem("token")) {
            return await axios.post(USER_API_BASE_URL+"/change-password", credentials, {headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }});
        }
        return await axios.get(USER_API_BASE_URL+"/change-password", credentials);
    }

    async getProfile() {
        // var token = localStorage.getItem("token");
        // return axios.get(USER_API_BASE_URL+'/profile', { headers : {Authorization : `Bearer ${token}`, "Content-Type":"text/plain"}})
        console.log("token: "+localStorage.getItem("token"));
        if (localStorage.getItem("token")) {
            return await axios.get(USER_API_BASE_URL+"/profile", {headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }});
        }
        return await axios.get(USER_API_BASE_URL+"/profile");

    }

    async registerEvent(eventId, userId) {
        console.log(localStorage.getItem("token"));
        return await axios.post(USER_API_BASE_URL+ "/register/event/" + eventId, userId,{headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
        }});
    }
}
export default new UserService();
