import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/user"

class UserService {
    loginUser(credentials) {
        return axios.post(USER_API_BASE_URL+'/login', credentials);
    }

    createVolunteer(user){
        return axios.post(USER_API_BASE_URL+'/register-volunteer', user);
    }
    createOrganisation(user){
        return axios.post(USER_API_BASE_URL+'/register-organisation', user);
    }

    changePassword(credentials) {
        return axios.post(USER_API_BASE_URL+'/change-password', credentials);
    }
}

export default new UserService()