import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8080/api/v1/auth"

class AuthService {
    loginUser(credentials) {
        return axios.post(AUTH_API_BASE_URL+'/login', credentials);
    }

    createVolunteer(user){
        return axios.post(AUTH_API_BASE_URL+'/register-volunteer', user);
    }
    createOrganisation(user){
        return axios.post(AUTH_API_BASE_URL+'/register-organisation', user);
    }
    createAdmin(user){
        return axios.post(AUTH_API_BASE_URL+'register-admin', user);
    }

}

export default new AuthService()