import { BASE_API_URL } from "../common/constants";
import axios from "axios";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/user";

class UserService {
  //권한 변경
  changeRole(role) {
    return axios.put(
      API_URL + "/change/" + role,
      {},
      { headers: authHeader() }
    );
  }
  // 프로필수정
  updateProfile(user) {
    return axios.put(`${API_URL}/profile`, user, { headers: authHeader() });
  }
}

const userService = new UserService();

export default userService;
