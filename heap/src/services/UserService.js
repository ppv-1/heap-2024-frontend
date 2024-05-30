import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/v1/user"

class UserService {
    loginUser(credentials) {
        return axios.post(USER_API_BASE_URL+'/login', credentials);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL+'/register-volunteer', user);
    }


}

export default new UserService()