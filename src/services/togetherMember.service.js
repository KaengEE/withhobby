import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/together";

class TogetherMemberService {
  joinTogether(teamId, togetherId) {
    return axios.post(`${API_URL}/${teamId}/join/${togetherId}`, null, {
      headers: authHeader(),
    });
  }
}

const togetherMemberService = new TogetherMemberService();

export default togetherMemberService;
