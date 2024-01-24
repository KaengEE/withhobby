import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { authHeader } from "./base.service";

const API_URL = BASE_API_URL + "/api/together";

class TogetherMemberService {
  //모임가입
  joinTogether(teamId, togetherId) {
    return axios.post(`${API_URL}/${teamId}/join/${togetherId}`, null, {
      headers: authHeader(),
    });
  }

  //모임취소
  cancelTogether(togetherId) {
    return axios.delete(`${API_URL}/cancel/${togetherId}`, {
      headers: authHeader(),
    });
  }
}

const togetherMemberService = new TogetherMemberService();

export default togetherMemberService;
