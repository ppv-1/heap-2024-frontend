import { API } from "./API";

class AuthService {
  async loginUser(credentials) {
    return await API.post("/auth/login", credentials);
  }

  async createVolunteer(user) {
    return await API.post("/auth/register-volunteer", user);
  }

  async createOrganisation(user) {
    return await API.post("/auth/register-organisation", user);
  }

  async createAdmin(user) {
    return await API.post("/auth/register-admin", user);
  }

  async forgetPassword(email) {
    return await API.get(`/auth/forget-password/${email}`);
  }

  async resetPassword(token, password) {
    return await API.post(`/auth/reset-password/${token}`, password);
  }
}

export default new AuthService();
