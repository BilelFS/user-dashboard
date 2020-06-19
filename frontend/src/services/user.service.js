import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  createUserByAdmin(user) {
    return axios.post(API_URL + "new", user, { headers: authHeader() });
  }

  getUserByAdmin(id) {
    return axios.get(API_URL + "find/" + id, { headers: authHeader() });
  }
  updateUserByAdmin(id, user) {
    return axios.put(API_URL + id, user, { headers: authHeader() });
  }
  deleteUserByAdmin(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new UserService();
