import axios from "axios";
import authHeader from "./auth-header";

//const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get("/api/test/all");
  }

  getUserBoard() {
    return axios.get("/api/test/user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get("/api/test/mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get("/api/test/admin", { headers: authHeader() });
  }

  createUserByAdmin(user) {
    return axios.post("/api/test/new", user, { headers: authHeader() });
  }

  getUserByAdmin(id) {
    return axios.get("/api/test/find/" + id, { headers: authHeader() });
  }
  updateUserByAdmin(id, user) {
    return axios.put("/api/test/" + id, user, { headers: authHeader() });
  }
  deleteUserByAdmin(id) {
    return axios.delete("/api/test/" + id, { headers: authHeader() });
  }
}

export default new UserService();
