import axios from "axios";

const VOLUNTEER_API_BASE_URL = "http://localhost:8080/api/v1/volunteer"

class VolunteerService{

    async registerEvent(eventId, userId) {
        console.log(localStorage.getItem("token"));
        console.log(typeof userId);
        return await axios.post(VOLUNTEER_API_BASE_URL+ "/register/event/" + eventId, userId,{headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`, 'Content-Type': 'text/plain'
        }});
    }

}
export default new VolunteerService();